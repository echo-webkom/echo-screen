import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProgressBar } from "./progress-bar";
import { TRANSITION_TIME } from "../config";

type ScreenCycleProps = {
  screens: Array<React.FC>;
};

export const ScreenCycle = ({ screens }: ScreenCycleProps) => {
  const [screenIndex, setScreenIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const interval = setInterval(() => {
      setScreenIndex((prevIndex) => (prevIndex + 1) % screens.length);
    }, TRANSITION_TIME);
    return () => clearInterval(interval);
  }, [screens.length]);

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
        setScreenIndex((prevIndex) => (prevIndex + 1) % screens.length);
      } else if (event.key === "ArrowLeft") {
        setScreenIndex((prevIndex) => (prevIndex - 1 + screens.length) % screens.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [screens.length]);

  const CurrentScreen = screens[screenIndex];

  console.log("CS", screens[screenIndex]);

  return (
    <div className="flex-1">
      {/* `key` is hack to force unmount the progressbar on change */}
      {/* Should maybe be removed in the future */}
      <ProgressBar key={screenIndex} width={screenWidth} />

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
            <CurrentScreen />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
