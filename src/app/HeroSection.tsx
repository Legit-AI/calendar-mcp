"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RotatingText = ({
  items,
  interval = 4000,
  delay = 0,
}: {
  items: { text: string; width: number }[];
  interval?: number;
  delay?: number;
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

  const currentItem = items[index];

  return (
    <motion.div
      animate={{ width: currentItem.width }}
      transition={{ duration: 0.3 }}
      className="inline-block relative"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentItem.text}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0"
        >
          {currentItem.text}
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
        items={[
          { text: "ChatGPT", width: 70 },
          { text: "Claude", width: 60 },
          { text: "N8N", width: 35 },
        ]}
      />{" "}
      read your{" "}
      <RotatingText
        items={[
          { text: "Google Calendar", width: 140 },
          { text: "Outlook Calendar", width: 145 },
        ]}
        delay={2000}
      />
    </div>
  </section>
);
