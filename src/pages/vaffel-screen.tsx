import type { VaffelQueue } from "../hooks/use-vaffel";
import WaffleRain from "../components/vaffel";

type VaffelProps = {
  queue: VaffelQueue;
  status: string;
  total: number;
};

export default function VaffelScreen({ queue, status, total }: VaffelProps) {
  const cols = queue.length > 20 ? 3 : queue.length > 10 ? 2 : 1;
  const maxWidthClass = cols === 3 ? "max-w-4xl" : cols === 2 ? "max-w-3xl" : "max-w-2xl";
  const columnsClass = cols === 3 ? "columns-3" : cols === 2 ? "columns-2" : "";

  return (
    <div className="w-full h-full flex items-center justify-center">
      <WaffleRain amount={total} />
      <div
        className={`bg-background/80 border-2 shadow-lg rounded-2xl p-8 ${maxWidthClass} w-full text-center`}
      >
        <h1 className="text-3xl font-semibold mb-2">Vaffelkø</h1>
        <p className="text-lg font-semibold mb-6 space-x-2">
          Status:{" "}
          <span
            className={
              status === "open" ? "text-green-600 font-semibold" : "text-red-500 font-semibold"
            }
          >
            {status === "open" ? "Åpen" : "Stengt"}
          </span>
          <span>
            Vafler stekt: <span className="font-normal">{total} </span>
          </span>
          <span>
            queue.length: <span className="font-normal">{queue.length} </span>
          </span>
        </p>

        {queue.length === 0 ? (
          <p className="text-gray-800">Ingen i køen</p>
        ) : (
          <ul className={columnsClass}>
            {queue.map((person, index) => (
              <li
                key={person.user_id}
                className="flex items-center gap-2 rounded-xl px-6 break-inside-avoid"
              >
                <span className="font-semibold w-6 text-right">{index + 1}:</span>
                <span>{person.display_name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
