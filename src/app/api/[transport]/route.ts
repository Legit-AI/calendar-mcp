import { filterICSEvents } from "@/app/filterICSEvents";
import { createMcpHandler } from "@vercel/mcp-adapter";
import z from "zod";

const calendarUrl =
  "https://calendar.google.com/calendar/ical/your-calendar-id/public/basic.ics";

const searchParamsSchema = z
  .instanceof(URLSearchParams)
  .transform((sp) => Object.fromEntries(sp.entries()))
  .pipe(
    z.object({
      name: z.string().optional(),
      email: z.string().email(),
      icsUrl: z.string().url(),
    }),
  );

const calendarEventsFiltersSchemaShape = {
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  search_query: z.string().optional(),
  organizer_email: z.string().optional(),
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).max(60).optional().default(20),
};

const calendarEventsFiltersSchema = z.object(calendarEventsFiltersSchemaShape);

export type CalendarEventsFiltersSchema = z.infer<
  typeof calendarEventsFiltersSchema
>;

const handler = (request: Request) => {
  const urlSearchParams = new URL(request.url).searchParams;
  const searchParams = searchParamsSchema.parse(urlSearchParams);

  return createMcpHandler(
    (server) => {
      server.tool(
        "roll_dice",
        "Rolls an N-sided die",
        {
          sides: z.number().int().min(2),
        },
        async ({ sides }) => {
          const value = 1 + Math.floor(Math.random() * sides);
          return {
            content: [{ type: "text", text: `🎲 You rolled a ${value}!` }],
          };
        },
      );

      server.tool(
        "calendar_events",
        `Fetch a calendar in iCal format and optionally filter the events`,
        calendarEventsFiltersSchemaShape,
        async (calendarEventsFilters) => {
          try {
            const response = await fetch(calendarUrl);
            const fullICSContent = await response.text();
            const filteredICSContent = filterICSEvents(
              fullICSContent,
              calendarEventsFilters,
            );

            return {
              content: [{ type: "text", text: filteredICSContent }],
            };
          } catch (error: any) {
            console.error(
              `Error - searchParams: ${JSON.stringify(searchParams)} - error.message: ${error.message}`,
            );
            return {
              content: [
                {
                  type: "text",
                  text: `Calendar failed to load, possibly due to an invalid URL. Visit ${process.env.VERCEL_PROJECT_PRODUCTION_URL} for instructions or contact support at ${process.env.SUPPORT_EMAIL}`,
                },
              ],
            };
          }
        },
      );
    },
    {},
    {
      basePath: "/api",
      maxDuration: 10,
      verboseLogs: true,
    },
  )(request);
};

export { handler as GET, handler as POST };
