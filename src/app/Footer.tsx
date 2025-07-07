import Link from "next/link";
import { PropsWithChildren } from "react";
import { LegitLogo } from "./LegitLogo";

const FooterLink = ({
  href,
  children,
  className,
}: PropsWithChildren & { href: string; className?: string }) => (
  <Link
    className={`whitespace-nowrap text-blue-500 hover:text-blue-700 transition-colors ${className ?? ""}`}
    href={href}
  >
    {children}
  </Link>
);

export const Footer = () => (
  <header className="flex justify-center">
    <div className="flex-1 px-4 max-w-2xl">
      <div className="py-4 flex-1 flex justify-between border-t border-zinc-200 text-zinc-400 flex-col">
        <Link href="https://www.wearelegit.ai">
          <LegitLogo className="w-10 h-10" />
        </Link>
        <div className="leading-relaxed pt-3 text-xs">
          Built by&nbsp;
          <FooterLink href="https://www.linkedin.com/in/eliasylonen">
            Elias Ylönen
          </FooterLink>{" "}
          <FooterLink href="http://linkedin.com/in/akunikkola">
            Aku Nikkola
          </FooterLink>{" "}
          and{" "}
          <FooterLink href="http://linkedin.com/in/anttiinnanen">
            Antti Innanen
          </FooterLink>{" "}
          at <FooterLink href="https://www.wearelegit.ai">LEGIT</FooterLink>
        </div>
      </div>
    </div>
  </header>
);
