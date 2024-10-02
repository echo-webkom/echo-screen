import { useState } from "react";
import {
  HappeningType,
  useUpcomingHappenings,
} from "../hooks/use-upcoming-happenings";

export default function Calender() {
  const [happeningTypes, setHappeningTypes] = useState<Array<HappeningType>>([
    "bedpres",
  ]);
  const { happenings } = useUpcomingHappenings(happeningTypes);

  return (
    <div className="border-2 rounded-md border-black">
      <h2>Calender</h2>
      <button
        className="px-2 py-1 rounded-lg border"
        onClick={() => setHappeningTypes(["bedpres"])}
      >
        Bedpres
      </button>
      <button
        className="px-2 py-1 rounded-lg border"
        onClick={() => setHappeningTypes(["event"])}
      >
        Event
      </button>
      <ul>
        {happenings?.map((happening) => (
          <li key={happening._id}>{happening.title}</li>
        ))}
      </ul>
    </div>
  );
}
