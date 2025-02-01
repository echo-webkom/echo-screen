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
  const [progress, setProgress] = useState(0);

  const upperProgressBound = 20 * 100;

  useEffect(() => {
    const progressBarCountDown = setInterval(() => {
      setProgress((prev) => (prev < upperProgressBound ? prev + 1 : 0));
      if (progress >= upperProgressBound) {
        setScreenIndex((prevIndex) => (prevIndex + 1) % SCREENS.length);
      }
    }, 10);

    return () => {
      clearInterval(progressBarCountDown);
    };
  }, [progress, upperProgressBound]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setScreenIndex((prevIndex) => (prevIndex + 1) % SCREENS.length);
        setProgress(0);
      } else if (event.key === "ArrowLeft") {
        setScreenIndex(
          (prevIndex) => (prevIndex - 1 + SCREENS.length) % SCREENS.length
        );
        setProgress(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-[calc(100vh-12rem)] w-[100%] space-y-7">
      <progress
        className="absolute top-0 left-0 w-full [&::-webkit-progress-bar]:h-1.5 [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-primary"
        value={progress}
        max={upperProgressBound}
      ></progress>
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
