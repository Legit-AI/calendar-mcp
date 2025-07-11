import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { baseUrl } from "./baseUrl";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Calendar MCP",
  description:
    "Connect Apple Calendar to Claude. An iCalendar (.ics) remote MCP server built by LEGIT.",
  openGraph: {
    title: "Calendar MCP",
    description:
      "Connect Apple Calendar to Claude. An iCalendar (.ics) remote MCP server built by LEGIT.",
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Calendar MCP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendar MCP",
    description:
      "Connect Apple Calendar to Claude. An iCalendar (.ics) remote MCP server built by LEGIT.",
    images: [`${baseUrl}/api/og`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
