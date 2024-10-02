import { onlyTimeHHMM, weekdayAndDate } from "../utils/date";

export default function DateTime() {
  const today = new Date();
  const formattedTime = onlyTimeHHMM(today);
  const formattedDate =
    weekdayAndDate(today).charAt(0).toUpperCase() +
    weekdayAndDate(today).slice(1);

  return (
    <div>
      <h1 className="text-4xl text-white flex justify-between">
        <p>{formattedDate}</p>
        <p>{formattedTime}</p>
      </h1>
    </div>
  );
}
