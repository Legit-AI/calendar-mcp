import { filterICSEvents } from "@/app/filterICSEvents";
import { toSnakeCase } from "@/app/toSnakeCase";
import { createMcpHandler } from "@vercel/mcp-adapter";
import z from "zod";

const searchParamsSchema = z
  .instanceof(URLSearchParams)
  .transform((sp) => Object.fromEntries(sp.entries()))
  .pipe(
    z.object({
      email: z.string().email().optional(),
      icsUrl: z.string().url(),
    }),
  );

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const calendarEventsFiltersSchemaShape = {
  start_date: z
    .string()
    .regex(dateRegex, "Must be in yyyy-mm-dd format")
    .describe("yyyy-mm-dd"),
  end_date: z
    .string()
    .regex(dateRegex, "Must be in yyyy-mm-dd format")
    .optional()
    .describe(`yyyy-mm-dd`),
  search_query: z.string().optional(),
  organizer_email: z.string().email().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(60).optional().default(20),
};

const calendarEventsFiltersSchema = z.object(calendarEventsFiltersSchemaShape);

export type CalendarEventsFilters = z.infer<typeof calendarEventsFiltersSchema>;

const handler = (request: Request) => {
  const urlSearchParams = new URL(request.url).searchParams;
  const searchParams = searchParamsSchema.parse(urlSearchParams);
  const { email, icsUrl } = searchParams;

  return createMcpHandler(
    (server) => {
      server.tool(
        `calendar_events`,
        `Fetch my calendar in iCal format. Filter and search events.`,
        calendarEventsFiltersSchemaShape,
        async (calendarEventsFilters) => {
          try {
            const fetchUrl = icsUrl.replace(/^webcal:\/\//, "https://");
            const response = await fetch(fetchUrl);
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
              `Error: ${error.message}, searchParams: ${JSON.stringify(searchParams)}`,
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
