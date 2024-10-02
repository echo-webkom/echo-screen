import { shortDate } from "../utils/date";

export default function DateTime() {
  const dateTime = Date.now();
  const formatedTime = shortDate(dateTime.toString());
  return (
    <div>
      <h1 className="text-4xl bg-red-600">{formatedTime}</h1>
    </div>
  );
}
