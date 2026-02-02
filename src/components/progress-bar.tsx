import { motion } from "framer-motion";
import { TRANSITION_TIME } from "../config";
import { isValentinesSeason } from "../utils/date";

type ProgressBarProps = {
  width: number;
};

export const ProgressBar = ({ width }: ProgressBarProps) => {
  const isValentines = isValentinesSeason();
  return (
    <motion.div
      animate={{
        width
      }}
      transition={{
        duration: TRANSITION_TIME / 1000,
        ease: "linear",
        repeat: Infinity
      }}
      initial={{
        width: 0
      }}
      className={`h-2 w-6 ${isValentines ? "bg-valentines-border" : "bg-primary"} absolute top-0 left-0`}
    />
  );
};
