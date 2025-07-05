import { CalendarEventsFiltersSchema } from "./api/[transport]/route";
/*
For context:

type CalendarEventsFiltersSchema = {
    page: number;
    limit: number;
    start_date?: string | undefined;
    end_date?: string | undefined;
    search_query?: string | undefined;
    organizer_email?: string | undefined;
}
*/

const getEventStartEpoch = (event: string) => {
  const match = event.match(/DTSTART(?:;[^:]+)?:([^\r\n]+)/);
  return match ? Date.parse(match[1]) || 0 : 0;
};

export const filterICSEvents = (
  fullICSContent: string,
  calendarEventsFiltersSchema: CalendarEventsFiltersSchema,
) => {
  const calendars = fullICSContent.match(
    /BEGIN:VCALENDAR[\s\S]*?END:VCALENDAR/gm,
  );

  if (calendars === null) throw new Error("No calendars found in ICS file");

  return calendars
    .map((calendar) => {
      const events = calendar.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/gm) || [];

      const sortedEvents = events.sort(
        (a, b) => getEventStartEpoch(a) - getEventStartEpoch(b),
      );

      const filteredEvents = sortedEvents.filter((event) => {
        return true;
      });

      const nonEventParts = calendar
        .replace(/BEGIN:VEVENT[\s\S]*?END:VEVENT/gm, "")
        .replace(/END:VCALENDAR[\r\n]*/i, "");

      return `${nonEventParts}\n${filteredEvents.join("")}\nEND:VCALENDAR`;
    })
    .join("\n");
};
