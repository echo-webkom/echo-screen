import BedpressCountDown from "./bedpress-count-down";
import BikeStation from "./bikes";
import Calendar from "./calendar";
import { MovieCard } from "./movie-card";

export default function BentoScreen() {
  return (
    <div className="h-[calc(100vh-12rem)] w-[100%] space-y-7">
      <Calendar />
      <div className="flex w-[100%] gap-6 h-56">
        <BedpressCountDown />
        <MovieCard />
      </div>
      <BikeStation />
    </div>
  );
}
