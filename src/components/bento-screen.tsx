import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BedpressCountDown from "./bedpress-count-down";
import Calendar from "./calendar";
import EnTurTimetable from "./entur-timetable";
import { Bysykkel } from "./bysykkel";
import TodaysBirthdays from "./todays-birthdays";
import OrakelTorsdag from "../assets/orakel-torsdag.png";

const SCREENS = [
  <div key="screen1" className="w-fulll h-full flex flex-col gap-7">
    <Calendar />
    <div className="flex gap-7">
      <BedpressCountDown />
      <TodaysBirthdays />
    </div>
  </div>,
  <div key="screen2" className="w-full h-full">
    <EnTurTimetable />
    <Bysykkel />
  </div>,
  <div key="screen3" className="w-full h-full flex items-center justify-center">
    <img src={OrakelTorsdag} className="h-[80vh]" />
  </div>,
];

const transitionTime = 30000;

export default function BentoScreen() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const interval = setInterval(() => {
      setScreenIndex((prevIndex) => (prevIndex + 1) % SCREENS.length);
    }, transitionTime);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleWidthChange = () => {
      setScreenWidth(window.innerWidth);
    };

    handleWidthChange();

    window.addEventListener("resize", handleWidthChange);

    return () => window.removeEventListener("resize", handleWidthChange);
  });

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
    <div className="h-[calc(100vh-12rem)] w-full space-y-7">
      <div className="absolute w-full top-0 h-2 left-0">
        <motion.div
          animate={{
            width: screenWidth,
          }}
          key={screenIndex}
          transition={{
            duration: transitionTime / 1000,
            ease: "linear",
            repeat: Infinity,
          }}
          initial={{
            width: 0,
          }}
          className="h-2 w-6 bg-primary"
        ></motion.div>
      </div>
      <div className="flex w-full gap-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={screenIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            {SCREENS[screenIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
