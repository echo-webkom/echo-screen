export function Orakel() {
  return (
    <div className="flex flex-col items-center w-full justify-center bg-background/70 border-2 shadow-lg rounded-lg p-10">
      <h1 className="text-5xl font-bold drop-shadow-lg">
        informatikk - Orakel
      </h1>
      <p className="mt-4 text-lg max-w-2xl">
        Få hjelp med informatikkoppgaver 💻
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/20 p-6 rounded-lg border-2">
          <h2 className="text-2xl font-semibold">📅 Tid</h2>
          <p className="mt-2 text-lg font-bold">Onsdag og Torsdag</p>
          <p className="mt-2 text-lg">14:15 - 16:00</p>
        </div>
        <div className="bg-white/20 p-6 rounded-lg border-2">
          <h2 className="text-2xl font-semibold">📍 Sted</h2>
          <p className="mt-2 text-lg">Programmerbar</p>
        </div>
        <div className="bg-white/20 p-6 rounded-lg border-2">
          <h2 className="text-2xl font-semibold">🧇 Vaffel</h2>
          <p className="mt-2 text-md">Gratis vafler på torsdagene!</p>
          <p className="mt-2 text-md italic">Bestilles gjennom discord</p>
        </div>
      </div>
    </div>
  );
}
