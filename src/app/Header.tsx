import Link from "next/link";
import { GitHubLogo } from "./GitHubLogo";
import { LegitLogo } from "./LegitLogo";

export const Header = () => (
  <header className="flex justify-center">
    <div className="flex-1 px-4 max-w-2xl">
      <div className="py-4 flex-1 flex justify-between border-b border-zinc-200">
        <Link href="/" className="flex items-center">
          {/*<LegitLogo className="w-12 h-12" />*/}
          <div className="flex flex-col">
            <div className="">Calendar MCP</div>
            <div className="font-[family-name:var(--font-ibm-plex-mono)] text-zinc-400 text-xs">
              The iCal (.ics) remote MCP server
            </div>
          </div>
        </Link>
        <Link
          className="flex items-center px-4 bg-zinc-50 hover:bg-zinc-100 transition-colors duration-500"
          href="https://github.com/Legit-AI/calendar-mcp"
          target="_blank"
        >
          <GitHubLogo className="w-4 h-4 text-zinc-500" />
          <div className="pl-2 text-xs">Star on GitHub</div>
        </Link>
      </div>
    </div>
  </header>
);
