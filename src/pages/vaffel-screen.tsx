import type { VaffelQueue } from "../hooks/use-vaffel";
import WaffleRain from "../components/vaffel";

type VaffelProps = {
  queue: VaffelQueue;
  status: string;
  total: number;
};

export default function VaffelScreen({ queue, status, total }: VaffelProps) {
  return (
    <div className="w-full flex items-center justify-center">
      <WaffleRain amount={total} />
      <div className="bg-background/80 border-2 shadow-lg rounded-2xl p-8 max-w-2xl w-full text-center overflow-hidden">
        <h1 className="text-3xl font-semibold mb-2">Vaffelkø</h1>
        <p className="text-lg font-semibold mb-6 space-x-2">
          Status:{" "}
          <span
            className={
              status === "open" ? "text-green-600 " : "text-red-500 "
            }
          >
            {status === "open" ? "Åpen" : "Stengt"}
          </span>
          <span>
            Vafler stekt: <span className="font-normal">{total} </span>
          </span>
        </p>

        {queue.length === 0 ? (
          <p className="text-gray-800">Ingen i køen</p>
        ) : (
          <ul>
            {queue.slice(0,15).map((person, index) => (
              <li key={person.user_id} className="flex items-center gap-4 rounded-xl px-6 ">
                <span className=" font-semibold text-lg w-6 text-right">{index + 1}:</span>
                <span>{person.display_name}</span>
              </li>
            ))}
            <li className="flex px-6 text-lg font-semibold">flere...</li>
          </ul>
        )}
      </div>
    </div>
  );
}
