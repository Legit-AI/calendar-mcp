import Link from "next/link";
import { GitHubLogo } from "./GitHubLogo";
import { CalendarMCPLogo } from "./CalendarMCPLogo";

const Subtitle = ({ className }: { className?: string }) => (
  <div className={`font-mono text-zinc-400 text-xs ${className ?? ""}`}>
    The iCal (.ics) remote MCP server
  </div>
);

export const Header = () => (
  <header className="flex justify-center">
    <div className="flex-1 px-4 max-w-2xl">
      <div className="py-4 flex-1 flex justify-between border-b border-zinc-200">
        <Link href="/" className="flex items-center">
          <div className="h-10 w-10 flex items-center justify-center bg-zinc-50 mr-4">
            <CalendarMCPLogo className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <div className="">Calendar MCP</div>
          </div>
        </Link>
        <Link
          className="flex items-center px-4 bg-zinc-50 hover:bg-zinc-100 transition-colors duration-500"
          href="https://github.com/Legit-AI/calendar-mcp"
          target="_blank"
        >
          <GitHubLogo className="w-4 h-4 text-zinc-500" />
          <div className="pl-2 text-xs">GitHub</div>
        </Link>
      </div>
      <Subtitle className="xs:hiddend leading-none pt-4" />
    </div>
  </header>
);
