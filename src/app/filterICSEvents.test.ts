import { filterICSEvents } from "./filterICSEvents";

describe("filterICSEvents", () => {
  const sampleICSContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//test//TEST//EN
X-WR-CALNAME:Test Calendar
BEGIN:VEVENT
DTSTAMP:20250705T195017Z
SUMMARY:Test Event
TZID:Europe/Zagreb
SEQUENCE:0
UID:test-uid-123
CREATED:20250705T195017Z
DTSTART;TZID=Europe/Zagreb:20250706T191500
DTEND;TZID=Europe/Zagreb:20250706T201500
END:VEVENT
BEGIN:VTIMEZONE
TZID:Europe/Zagreb
BEGIN:STANDARD
DTSTART:18840101T000000
TZNAME:CET
TZOFFSETFROM:+0122
TZOFFSETTO:+0100
END:STANDARD
END:VTIMEZONE
END:VCALENDAR`;

  it("should filter events based on basic filters", () => {
    const filters = {
      start_date: "2025-01-01",
      page: 1,
      limit: 20
    };

    const result = filterICSEvents(sampleICSContent, filters);
    
    expect(result).toContain("BEGIN:VCALENDAR");
    expect(result).toContain("END:VCALENDAR");
    expect(result).toContain("Test Event");
  });

});