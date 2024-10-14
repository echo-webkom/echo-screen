import BedpressCountDown from "./bedpress-count-down";
import Calendar from "./calendar";
import { MovieCard } from "./movie-card";

export default function BentoScreen() {
  return (
    <div className="grid grid-cols-10 grid-rows-10 h-[calc(100vh-12rem)] w-[100%] gap-6">
      <div className="border-2 rounded-lg overflow-hidden col-span-10 row-span-4">
        <Calendar />
      </div>
      <div className="border-2 rounded-lg col-span-3 row-span-4">
        <BedpressCountDown />
      </div>
      <div className="border-2 rounded-lg col-span-3 row-span-4">
        <MovieCard />
      </div>
    </div>
  );
}
