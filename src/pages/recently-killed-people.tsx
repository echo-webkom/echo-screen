import { useHungerGames } from "../hooks/use-hunger-games";
import { useEffect, useState } from "react";
import { urlFor } from "../lib/sanity";
import { AnimatePresence, motion } from "framer-motion";
import noPhoto from "../assets/noPhoto.png";

export default function ShowRecentlyKilledPeople() {
  const { data } = useHungerGames();
  const recentlyKilledPeople = data?.recent ?? [];

  const [playerIndex, setPlayerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerIndex((prevPlayerIndex) => (prevPlayerIndex + 1) % recentlyKilledPeople.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [recentlyKilledPeople.length]);

  const currenPlayer = recentlyKilledPeople[playerIndex];
  const onlyOneDead = recentlyKilledPeople.length === 1;
  return (
    <div className="flex justify-center items-center h-[90%]">
      {currenPlayer ? (
        <div>
          <h1 className="text-6xl font-semibold text-red-600 text-center pb-8">
            {onlyOneDead ? "Denne spilleren eliminert igår:" : "Disse ble eleminert igår:"}
          </h1>
          <AnimatePresence mode="wait">
            <motion.div
              key={playerIndex}
              initial={{ opacity: onlyOneDead ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: onlyOneDead ? 1 : 0 }}
              transition={{ duration: 2 }}
              className="w-full h-full"
            >
              <div className="flex justify-center">
                {currenPlayer.profile.picture ? (
                  <img
                    className="border-4 border-red-600 rounded-full h-96 w-96"
                    src={urlFor(currenPlayer.profile.picture!).width(400).height(400).url()}
                    alt={currenPlayer.profile.name}
                  />
                ) : (
                  <img
                    className="border-4 border-red-600 rounded-full h-96 w-96"
                    src={noPhoto}
                    alt={currenPlayer.profile.name}
                  />
                )}
              </div>

              <h1 className="text-center text-4xl font-semibold text-red-600">
                {currenPlayer?.profile.name}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <h1 className="text-center font-semibold text-6xl text-red-600">Ingen døde igår</h1>
      )}
    </div>
  );
}
