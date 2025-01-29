import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BedpressCountDown from "./bedpress-count-down";
import Calendar from "./calendar";
import EnTurTimetable from "./entur-timetable";
import { Bysykkel } from "./bysykkel";

const SCREENS = [
  <div key="screen1" className="w-[100%] h-[100%] flex flex-col gap-7">
    <Calendar />
    <BedpressCountDown />
  </div>,
  <div key="screen2" className="w-[100%] h-[100%]">
    <EnTurTimetable />
    <Bysykkel />
  </div>,
];

export default function BentoScreen() {
  const [screenIndex, setScreenIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScreenIndex((prevIndex) => (prevIndex + 1) % SCREENS.length);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setScreenIndex((prevIndex) => (prevIndex + 1) % SCREENS.length);
      } else if (event.key === "ArrowLeft") {
        setScreenIndex(
          (prevIndex) => (prevIndex - 1 + SCREENS.length) % SCREENS.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-[calc(100vh-12rem)] w-[100%] space-y-7">
      <div className="flex w-[100%] gap-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={screenIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-[100%] h-[100%]"
          >
            {SCREENS[screenIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
