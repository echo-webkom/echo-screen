import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BedpressCountDown from "./bedpress-count-down";
import Calendar from "./calendar";
import EnTurTimetable from "./entur-timetable";
import { MovieCard } from "./movie-card";
import Subwaysurfers from "./subwaysurfer";
import Bysykkel from "./bysykkel";

export default function BentoScreen() {
  const [showTimetable, setShowTimetable] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTimetable((prev) => !prev);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        setShowTimetable((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-[calc(100vh-12rem)] w-[100%] space-y-7">
      <div className="flex w-[100%] gap-10">
        <AnimatePresence mode="wait">
          {showTimetable ? (
            <motion.div
              key="timetable"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-[100%] h-[100%]"
            >
              <EnTurTimetable />
              <Bysykkel />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-[100%] h-[100%] flex flex-col gap-7"
            >
              <Calendar />
              <BedpressCountDown />
              <MovieCard />
            </motion.div>
          )}
        </AnimatePresence>
        <Subwaysurfers toggleSubwaysurfers={false} />
      </div>
    </div>
  );
}
