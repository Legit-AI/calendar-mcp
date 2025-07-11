"use client";

import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
  useState,
} from "react";
import z from "zod";
import { MCPConfigurationInstructions } from "./MCPConfigurationInstructions";
import { CalendarSharingInstructions } from "./CalendarSharingInstructions";
import { baseUrl } from "./baseUrl";

const InputLabel = ({ children }: PropsWithChildren) => (
  <label className="text-sm text-zinc-500 leading-none pb-2">{children}</label>
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
        className={`text-xs h-4leading-none uppercase font-mono transition-all duration-500 ${isActive ? "text-blue-700" : "text-zinc-500"}`}
      >
        0{number}
      </div>
      {!isLast && <div className="m-auto flex-1 w-[1px] my-4 bg-zinc-200" />}
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
  const [email, setEmail] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const { success: isIcsUrlValid } = z.string().url().safeParse(icsUrl);
  const { success: isEmailValid } = z.string().email().safeParse(email);

  const mcpUrl = `${baseUrl}/api/mcp?email=${encodeURIComponent(email)}&icsUrl=${encodeURIComponent(icsUrl)}`;

  return (
    <section className="px-4 pb-16 w-full flex flex-col max-w-2xl">
      <Step
        isActive={!isIcsUrlValid}
        number={1}
        title="Copy public calendar link"
      >
        <CalendarSharingInstructions />
        <Input
          className="font-mono text-sm"
          placeholder="webcal://p136-caldav.icloud.com/published/2/RQFdadfgSDfgadsgfa4gq34AE€GAEFGASDFGArgADF_ASdfgadsfgAFdGAhgtrwf"
          onChange={(event) => {
            setIcsUrl(event.target.value);
            setIsCopied(false);
          }}
        />
      </Step>
      <Step
        isActive={isIcsUrlValid && !isEmailValid}
        isDisabled={!isIcsUrlValid}
        number={2}
        title="Add metadata"
      >
        <div className="flex max-xs:flex-col">
          <div className="flex-1 flex flex-col">
            <InputLabel>Your Email Address</InputLabel>
            <Input
              className="text-sm"
              placeholder="tim@apple.com"
              onChange={(event) => {
                setEmail(event.target.value);
                setIsCopied(false);
              }}
            />
          </div>
        </div>
      </Step>
      <Step
        isActive={isIcsUrlValid && isEmailValid && !isCopied}
        isDisabled={!isIcsUrlValid || !isEmailValid}
        number={3}
        title="Copy MCP URL to Claude"
      >
        <MCPConfigurationInstructions
          mcpUrl={mcpUrl}
          isMcpUrlVisible={isIcsUrlValid && isEmailValid}
          isCopied={isCopied}
          onCopyClick={() => {
            navigator.clipboard.writeText(mcpUrl);
            setIsCopied(true);
          }}
        />
      </Step>
      <Step
        isLast
        isActive={isIcsUrlValid && isEmailValid && isCopied}
        isDisabled={!isIcsUrlValid || !isEmailValid}
        number={4}
        title="Ask Claude about your calendar"
      >
        <p className="text-zinc-500">
          Some examples:
          <br />
          "How should I prep to my meetings tomorrow?"
          <br />
          "Find concerts tomorrow in Paris that fit my calendar?"
        </p>
        {/* TODO: Try a prompt. Example: "Find concerts tomorrow in Paris that fit my calendar" */}
      </Step>
    </section>
  );
};
