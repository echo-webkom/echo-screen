import { onlyTimeHHMM, weekdayAndDate } from "../utils/date";

export default function DateTime() {
  const today = new Date();
  return (
    <div>
      <h1 className="text-4xl bg-red-600 flex justify-between">
        <p>{weekdayAndDate(today)}</p>
        <p>{onlyTimeHHMM(today)}</p>
      </h1>
    </div>
  );
}
