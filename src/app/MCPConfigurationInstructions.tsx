import Link from "next/link";

const MCPURLBox = ({
  mcpUrl,
  isMcpUrlVisible,
  isCopied,
  onCopyClick,
}: {
  mcpUrl: string;
  isMcpUrlVisible?: boolean;
  isCopied?: boolean;
  onCopyClick: () => any;
}) => (
  <div
    className={`p-4 text-sm flex bg-zinc-100 font-[family-name:var(--font-ibm-plex-mono)] transition-all duration-500 ${isMcpUrlVisible ? "text-zinc-700" : "text-zinc-400"}`}
  >
    <div className="flex-1 select-all break-all">
      {isMcpUrlVisible ? mcpUrl : "Fill form to get URL..."}
    </div>
    <button
      className={`cursor-pointer ml-4 px-4 py-2 border border-zinc-200 transition-all active:bg-zinc-100 active:scale-95 ${isCopied ? "bg-zinc-100" : "bg-white hover:bg-zinc-50"}`}
      onClick={() => onCopyClick()}
    >
      Copy
    </button>
  </div>
);

const ClaudeWebMCPConfigurationInstructions = ({
  mcpUrl,
  isMcpUrlVisible,
  isCopied,
  onCopyClick,
}: {
  mcpUrl: string;
  isMcpUrlVisible?: boolean;
  isCopied?: boolean;
  onCopyClick: () => any;
}) => (
  <>
    // TODO: Short step-by-step instructions on how to add a remote MCP to
    Claude (web)
    {/* <ul className="list-decimal">
      <li></li>
    </ul> */}
    <MCPURLBox
      mcpUrl={mcpUrl}
      isMcpUrlVisible={isMcpUrlVisible}
      isCopied={isCopied}
      onCopyClick={onCopyClick}
    />
  </>
);

const ClaudeForDesktopMCPConfigurationInstructions = ({
  mcpUrl,
  isMcpUrlVisible,
  isCopied,
  onCopyClick,
}: {
  mcpUrl: string;
  isMcpUrlVisible?: boolean;
  isCopied?: boolean;
  onCopyClick: () => any;
}) => (
  <>
    {/* TODO: Short step-by-step instructions on how to add a remote MCP to Claude for Desktop */}
    {/* <ul className="list-decimal">
      <li></li>
    </ul> */}
    <MCPURLBox
      mcpUrl={mcpUrl}
      isMcpUrlVisible={isMcpUrlVisible}
      isCopied={isCopied}
      onCopyClick={onCopyClick}
    />
  </>
);

export const MCPConfigurationInstructions = ({
  mcpUrl,
  isMcpUrlVisible,
  isCopied,
  onCopyClick,
}: {
  mcpUrl: string;
  isMcpUrlVisible?: boolean;
  isCopied?: boolean;
  onCopyClick: () => any;
}) => (
  <div>
    {/* <div>
      <Link href="/claude-web">Claude (web)</Link>
      <Link href="/claude-for-desktop">Claude for Desktop</Link>
    </div> */}
    <ClaudeWebMCPConfigurationInstructions
      mcpUrl={mcpUrl}
      isMcpUrlVisible={isMcpUrlVisible}
      isCopied={isCopied}
      onCopyClick={onCopyClick}
    />
  </div>
);
