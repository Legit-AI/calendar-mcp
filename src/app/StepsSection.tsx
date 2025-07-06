"use client";

import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
  useEffect,
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
  isLast,
  isDisabled,
  isActive,
}: PropsWithChildren & {
  number: number;
  title: string;
  isLast?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
}) => (
  <div className="flex">
    <div className="flex flex-col pr-4">
      <div
        className={`text-xs uppercase font-[family-name:var(--font-ibm-plex-mono)] transition-all duration-500 ${isActive ? "text-blue-700" : "text-zinc-500"}`}
      >
        0{number}
      </div>
      {!isLast && <div className="m-auto flex-1 w-[1px] bg-zinc-200" />}
    </div>
    <div
      className={`flex-1 flex flex-col transition-all duration-500 ${isLast ? "" : "pb-12"} ${isDisabled ? "opacity-40" : ""}`}
    >
      <h2 className="text-zinc-700 leading-none pb-4">{title}</h2>
      {children}
    </div>
  </div>
);

export const StepsSection = () => {
  const [icsUrl, setIcsUrl] = useState("");
  const [calendarName, setCalendarName] = useState("");
  const [email, setEmail] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isMcpUrlChanging, setIsMcpUrlChanging] = useState(false);

  const { success: isIcsUrlValid } = z.string().url().safeParse(icsUrl);
  const { success: isCalendarNameValid } = z
    .string()
    .min(1)
    .safeParse(calendarName);
  const { success: isEmailValid } = z.string().email().safeParse(email);

  const mcpUrl = `${
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "http://localhost:3000/"
  }api/mcp/?calendarName=${encodeURIComponent(calendarName)}&email=
  ${encodeURIComponent(email)}icsUrl=
  ${encodeURIComponent(icsUrl)}`;

  const isMcpUrlVisible =
    isIcsUrlValid && isCalendarNameValid && isEmailValid && !isMcpUrlChanging;

  return (
    <section className="px-4 pb-16 w-full flex flex-col max-w-2xl">
      <Step
        isActive={!isIcsUrlValid}
        number={1}
        title="Copy public calendar link from iCloud"
      >
        <Input
          placeholder="webcal://p136-caldav.icloud.com/published/2/RQFdadfgSDfgadsgfa4gq34AE€GAEFGASDFGArgADF_ASdfgadsfgAFdGAhgtrwf"
          onChange={(event) => {
            setIcsUrl(event.target.value);
            setIsMcpUrlChanging(true);
          }}
        />
      </Step>
      <Step
        isActive={isIcsUrlValid && (!isCalendarNameValid || !isEmailValid)}
        isDisabled={!isIcsUrlValid}
        number={2}
        title="Add metadata"
      >
        <div className="flex">
          <div className="flex-1 flex flex-col pr-4">
            <InputLabel>Calendar Name</InputLabel>
            <Input
              placeholder={"Tim's calendar, Work, Personal..."}
              onChange={(event) => {
                setCalendarName(event.target.value);
                setIsMcpUrlChanging(true);
              }}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <InputLabel>Your Email Address</InputLabel>
            <Input
              placeholder="tim@apple.com"
              onChange={(event) => {
                setEmail(event.target.value);
                setIsMcpUrlChanging(true);
              }}
            />
          </div>
        </div>
      </Step>
      <Step
        isActive={
          isIcsUrlValid && isCalendarNameValid && isEmailValid && !isCopied
        }
        isDisabled={!isIcsUrlValid || !isCalendarNameValid || !isEmailValid}
        number={3}
        title="Copy MCP URL to Claude"
      >
        <div
          className={`p-4 text-sm flex bg-zinc-100 font-[family-name:var(--font-ibm-plex-mono)] transition-all duration-500 ${isMcpUrlVisible ? "text-zinc-700" : "text-zinc-400"}`}
        >
          <div className="flex-1">
            {isIcsUrlValid && isCalendarNameValid && isEmailValid
              ? mcpUrl
              : "Fill form to get URL..."}
          </div>
          <button
            className={`cursor-pointer px-4 py-2 border border-zinc-200 transition-all active:bg-zinc-100 active:scale-95 ${isCopied ? "bg-zinc-100" : "bg-white hover:bg-zinc-50"}`}
            onClick={() => setIsCopied(true)}
          >
            Copy
          </button>
        </div>
        {/* TODO: Instructions how to add a remote MCP to Claude */}
      </Step>
      <Step
        isLast
        isActive={
          isIcsUrlValid && isCalendarNameValid && isEmailValid && isCopied
        }
        isDisabled={!isIcsUrlValid || !isCalendarNameValid || !isEmailValid}
        number={4}
        title="Read your calendar with Claude"
      >
        <p className="text-zinc-500">
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        </p>
        {/* TODO: Try a prompt. Example: "Find concerts tomorrow in Paris that fit my calendar" */}
      </Step>
    </section>
  );
};
