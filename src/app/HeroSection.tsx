import Image from "next/image";
import { ClaudeLogo } from "./ClaudeLogo";

export const HeroSection = () => (
  <section className="px-4 pt-16 pb-10 w-full flex flex-col max-w-2xl">
    <h1 className="text-3xl leading-none">
      Connect{" "}
      <Image
        className="inline -mt-1 mr-1"
        src="/images/MACOSCalendar.png"
        alt="Mac OS Calendar icon"
        width={28}
        height={28}
      />
      Apple Calendar to <ClaudeLogo className="w-6 h-6 inline -mt-1 mr-1" />
      Claude
    </h1>
  </section>
);
