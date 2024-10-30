export default function SkyssTimeTable() {
  const url =
    "https://avgangsvisning.skyss.no/view/#/?stops=NSR%3AStopPlace%3A58544%7CNSR%3AQuay%3A53227,NSR%3AStopPlace%3A58544%7CNSR%3AQuay%3A53150,NSR%3AStopPlace%3A58544%7CNSR%3AQuay%3A53151,NSR%3AStopPlace%3A58544%7CNSR%3AQuay%3A53226&viewFreq=10000&type=TERMINAL&colors=light";

  return (
    <div className="text-center rounded-lg flex-auto border-2 shadow-lg overflow-hidden">
      <iframe
        className="object-contain"
        style={{
          marginTop: "-1.7cm",
          width: "100%",
          height: "calc(100% + 3cm)",
        }}
        src={url}
      />
    </div>
  );
}
