import Calendar from "./calendar";
import SkyssTimeTable from "./skyss-time-table";

export default function BentoScreen() {
  return (
    <div className="grid grid-cols-10 grid-rows-10 h-[calc(100vh-12rem)] w-[100%] gap-6">
      <div className="border-2 rounded-lg overflow-hidden col-span-10 row-span-4">
        <Calendar />
      </div>
      <div className="border-2 rounded-lg col-span-3 row-span-4">
        Dagens bursdag
      </div>
      <div className="border-2 overflow-hidden rounded-lg col-span-4 row-span-6">
        <SkyssTimeTable/>
      </div>
    </div>
  );
}
