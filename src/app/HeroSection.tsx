"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RotatingText = ({
  items,
  interval = 3000,
  delay = 0,
  widthMap,
}: {
  items: string[];
  interval?: number;
  delay?: number;
  widthMap: Record<string, number>;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        setIndex((i) => (i + 1) % items.length);
        scheduleNext();
      }, interval);
    };

    const initialTimeout = setTimeout(() => {
      setIndex(1 % items.length);
      scheduleNext();
    }, delay);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, [items, interval, delay]);

  const current = items[index];

  return (
    <motion.div
      animate={{ width: widthMap[current] }}
      transition={{ duration: 0.3 }}
      className="inline-block relative"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};

export const HeroSection = () => (
  <section className="px-4 py-16 w-full flex flex-col max-w-2xl">
    <h1 className="text-2xl leading-none">
      Connect your calendar to AI with MCP
    </h1>
    <div className="font-[family-name:var(--font-ibm-plex-mono)] uppercase text-zinc-400 text-sm">
      Let{" "}
      <RotatingText
        items={["ChatGPT", "Claude", "N8N"]}
        interval={4000}
        widthMap={{
          ChatGPT: 70,
          Claude: 60,
          N8N: 35,
        }}
      />{" "}
      read your{" "}
      <RotatingText
        items={["Google Calendar", "Outlook Calendar"]}
        delay={2000}
        interval={4000}
        widthMap={{
          "Google Calendar": 140,
          "Outlook Calendar": 145,
        }}
      />
    </div>
  </section>
);
