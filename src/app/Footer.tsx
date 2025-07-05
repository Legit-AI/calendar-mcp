import Link from "next/link";
import { PropsWithChildren } from "react";

const FooterLink = ({
  href,
  children,
  className,
}: PropsWithChildren & { href: string; className?: string }) => (
  <Link
    className={`hover:underlined text-blue-400 hover:text-blue-500 transition-colors font-bold ${className ?? ""}`}
    href={href}
  >
    {children}
  </Link>
);

export const Footer = () => (
  <footer className="flex justify-center items-center bg-zinc-100 h-6 text-zinc-700 px-4 text-xs">
    <div className="flex-1 max-w-2xl">
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
  </footer>
);
