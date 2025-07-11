import { CalendarEventsFilters } from "./api/[transport]/route";

const convertCompactISOToStandardISO = (compactISO: string): string => {
  return compactISO.replace(
    /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,
    "$1-$2-$3T$4:$5:$6",
  );
};

const getEventStartEpoch = (event: string) => {
  const compactISO = event.match(/^DTSTART(?:;[^:]+)?:([^\r\n]+)/m);
  if (!compactISO) throw new Error("No event start epoch found");
  const standardISO = convertCompactISOToStandardISO(compactISO[1]);
  const epoch = Date.parse(standardISO);
  return epoch;
};

const parseEpoch = (dateString: string) => new Date(`${dateString}T00:00:00`);

export const filterICSEvents = (
  fullICSContent: string,
  calendarEventsFilters: CalendarEventsFilters,
) => {
  const { page, limit, start_date, end_date, search_query, organizer_email } =
    calendarEventsFilters;

  const calendars = fullICSContent.match(
    /BEGIN:VCALENDAR[\s\S]*?END:VCALENDAR/gm,
  );

  if (calendars === null) throw new Error("No calendars found in ICS file");

  const startEpoch = start_date ? parseEpoch(start_date).getTime() : undefined;
  const endEpoch = end_date
    ? parseEpoch(end_date).getTime() + 24 * 60 * 60 * 1000 - 1
    : undefined;

  return calendars
    .map((calendar) => {
      const events = calendar.match(/^BEGIN:VEVENT[\s\S]*?^END:VEVENT/gm) || [];

      const sortedEvents = events.sort(
        (a, b) => getEventStartEpoch(a) - getEventStartEpoch(b),
      );

      const filteredEvents = sortedEvents.filter((event) => {
        const epoch = getEventStartEpoch(event);
        if (startEpoch && epoch < startEpoch) return false;
        if (endEpoch && epoch > endEpoch) return false;

        if (search_query) {
          const normalizedSearchQuery = search_query.toLowerCase();
          const summary = event.match(/^SUMMARY:(.*)/)?.[1] || "";
          const description = event.match(/^DESCRIPTION:(.*)/)?.[1] || "";

          const normalizedSummary = summary
            .replaceAll("\\n", "\n")
            .toLowerCase();
          const normalizedDescription = description
            .replaceAll("\\n", "\n")
            .toLowerCase();
          if (
            !normalizedSummary.includes(normalizedSearchQuery) &&
            !normalizedDescription.includes(normalizedDescription)
          )
            return false;
        }

        // TODO: Ignore dots and everything between + and @ signs
        if (
          organizer_email &&
          !event.match(new RegExp(`^ORGANIZER.*:${organizer_email}`, "i"))
        ) {
          return false;
        }

        return true;
      });

      const paginatedEvents = filteredEvents.slice(
        (page - 1) * limit,
        page * limit,
      );

      const nonEventParts = calendar
        .replace(/BEGIN:VEVENT[\s\S]*?END:VEVENT/gm, "")
        .replace(/END:VCALENDAR[\r\n]*/i, "");

      return `${nonEventParts}\n${paginatedEvents.join("")}\nEND:VCALENDAR`;
    })
    .join("\n");
};
