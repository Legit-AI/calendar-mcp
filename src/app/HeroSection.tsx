import Image from "next/image";
import { ClaudeLogo } from "./ClaudeLogo";

export const HeroSection = () => (
  <section className="px-4 pt-16 pb-10 w-full flex flex-col max-w-2xl">
    <h1 className="text-3xl leading-[1.5]">
      Connect{" "}
      <span className="whitespace-nowrap">
        <Image
          className="inline -mt-1 mr-[6px] w-7 h-7"
          src="/images/mac-os-calendar-logo.png"
          alt=""
          width={128}
          height={128}
        />
        Calendar
      </span>{" "}
      to{" "}
      <span className="whitespace-nowrap">
        <ClaudeLogo className="w-6 h-6 inline -mt-1 mr-[6px]" />
        Claude
      </span>
    </h1>
  </section>
);
