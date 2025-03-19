import { motion } from "framer-motion";

export function Webathon() {
  return (
    <div className="flex flex-col items-center justify-center bg-background/70 border-2 shadow-lg rounded-lg px-10 py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold drop-shadow-lg">Webathon 2025</h1>
        <h1 className="text-7xl font-bold drop-shadow-lg">MED BEKK</h1>
        <p className="mt-4 text-lg max-w-2xl">
          Velkommen til Webathon 2025 – en intens, kreativ og innovativ helg
          hvor deltakere utfordres til å lage den mest imponerende visuelle
          applikasjonen!
        </p>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/20 p-6 rounded-lg border-2">
          <h2 className="text-2xl font-semibold">📅 Dato & Tid</h2>
          <p className="mt-2 text-lg">28-30 Mars</p>
        </div>
        <div className="bg-white/20 p-6 rounded-lg border-2">
          <h2 className="text-2xl font-semibold">📍 Hvor</h2>
          <p className="mt-2 text-lg">HER!</p>
        </div>
        <div className="bg-white/20 p-6 rounded-lg border-2">
          <h2 className="text-2xl font-semibold">🏆 Priser</h2>
          <p className="mt-2 text-lg">Spennede premier</p>
        </div>
      </div>
    </div>
  );
}
