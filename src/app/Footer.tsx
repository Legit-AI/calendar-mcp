import Link from "next/link";
import { PropsWithChildren } from "react";
import { LegitLogo } from "./LegitLogo";

const FooterLink = ({
  href,
  children,
  className,
}: PropsWithChildren & { href: string; className?: string }) => (
  <Link
    className={`hover:underlined text-blue-500 hover:text-blue-600 transition-colors ${className ?? ""}`}
    href={href}
  >
    {children}
  </Link>
);

export const Footer = () => (
  <header className="flex justify-center">
    <div className="flex-1 px-4 max-w-2xl">
      <div className="py-4 flex-1 flex items-center border-td border-zinc-200">
        <Link href="https://www.wearelegit.ai">
          <LegitLogo className="w-6 h-6" />
        </Link>
        <div className="h-[1px] flex-1 bg-zinc-200 mx-4" />
        <div className="leading-none text-sm">
          Built by&nbsp;
          <FooterLink href="https://www.linkedin.com/in/eliasylonen">
            Elias Ylönen
          </FooterLink>
          ,&nbsp;
          <FooterLink href="http://linkedin.com/in/akunikkola">
            Aku Nikkola
          </FooterLink>
          &nbsp;and&nbsp;
          <FooterLink href="http://linkedin.com/in/anttiinnanen">
            Antti Innanen
          </FooterLink>
          &nbsp;at&nbsp;
          <FooterLink href="https://www.wearelegit.ai">LEGIT</FooterLink>
        </div>
      </div>
    </div>
  </header>
);
