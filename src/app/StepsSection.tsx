import { PropsWithChildren } from "react";

export const Step = ({
  number,
  title,
  children,
}: PropsWithChildren & { number: number; title: string }) => (
  <div className="flex">
    <div className="flex flex-col">
      <div className="text-xs uppercase text-zinc-500 font-[family-name:var(--font-ibm-plex-mono)">
        0{number}
      </div>
      <div className="m-auto flex-1 w-[1px] bg-zinc-200" />
    </div>
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  </div>
);

export const StepsSection = () => (
  <section className="px-4 py-16 w-full flex flex-col max-w-2xl">
    <Step number={1} title="Copy ICS link">
      test
    </Step>
    <Step number={2} title="Describe the calendar"></Step>
    <Step number={3} title="Copy MCP URL"></Step>
    <Step number={4} title="Done"></Step>
  </section>
);
