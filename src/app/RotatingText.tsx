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
