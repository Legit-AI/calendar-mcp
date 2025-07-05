import { LegitLogo } from "./LegitLogo";

export const Header = () => (
  <header className="flex justify-center">
    <div className="flex-1 px-4 max-w-2xl">
      <div className="py-4 flex-1 flex items-center border-b border-zinc-200">
        <LegitLogo className="w-12 h-12" />
        <div className="pl-4">Calendar MCP</div>
      </div>
    </div>
  </header>
);
