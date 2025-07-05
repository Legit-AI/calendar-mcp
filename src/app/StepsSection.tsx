"use client";

import {
  DetailedHTMLProps,
  HTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
  useState,
} from "react";
import z from "zod";

const InputLabel = ({ children }: PropsWithChildren) => (
  <label className="text-sm text-zinc-500">{children}</label>
);

const Input = (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) => (
  <input
    {...props}
    className={`border border-zinc-200 rounded-xld px-3 py-2 ${props.className}`}
  />
);

const Step = ({
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
    <div className="flex-1 flex flex-col">
      <h2 className="text-zinc-700">{title}</h2>
      {children}
    </div>
  </div>
);

export const StepsSection = () => {
  const [icsUrl, setIcsUrl] = useState("");
  const [calendarName, setCalendarName] = useState("");
  const [email, setEmail] = useState("");

  const { success: isIcsUrlValid } = z
    .string()
    .url()
    .catch("")
    .safeParse(icsUrl);

  const mcpUrl = `${
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "http://localhost:3000/"
  }api/mcp/?calendarName=${encodeURIComponent(calendarName)}&email=
  ${encodeURIComponent(email)}icsUrl=
  ${encodeURIComponent(icsUrl)}`;

  return (
    <section className="px-4 py-16 w-full flex flex-col max-w-2xl">
      <Step number={1} title="Copy public calendar link from iCloud">
        <Input
          placeholder="webcal://p136-caldav.icloud.com/published/2/RQFdadfgSDfgadsgfa4gq34AE€GAEFGASDFGArgADF_ASdfgadsfgAFdGAhgtrwf"
          onChange={(event) => setIcsUrl(event.target.value)}
        />
      </Step>
      <Step number={2} title="Add metadata">
        <div className="flex">
          <div className="flex-1 flex flex-col pr-4">
            <InputLabel>Calendar Name</InputLabel>
            <Input placeholder={"Tim's calendar"} />
          </div>
          <div className="flex-1 flex flex-col">
            <InputLabel>Your Email Address</InputLabel>
            <Input placeholder="tim@apple.com" />
          </div>
        </div>
      </Step>
      <Step number={3} title="Copy MCP URL to Claude">
        <div className="bg-zinc-100 font-[family-name:var(--font-ibm-plex-mono)">
          { mcpUrl}
          <button className="border hover:bg-zinc-50">Copy</button>
        </div>
        {/* TODO: Instructions how to add a remote MCP to Claude */}
      </Step>
      <Step number={4} title="Read your calendar with Claude">
        {/* TODO: Try a prompt. Example: "Find concerts tomorrow in Paris that fit my calendar" */}
      </Step>
    </section>
  );
};
