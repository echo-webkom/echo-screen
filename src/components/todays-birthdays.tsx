import { useBirthdays } from "../hooks/use-birthdays";

export default function TodaysBirthdays() {
  const { data } = useBirthdays();
  if (!data) {
    return null;
  }
  return (
    <div className="text-center flex-auto rounded-lg px-10 py-10 bg-background/70 border-2 shadow-lg w-10">
      <h1 className="text-xl mb-4 font-extrabold text-primary">
        🎉I dag har disse fine menneskene bursdag🎉
      </h1>
      {data.map((name) => {
        return <p className="font-bold">{name}</p>;
      })}
    </div>
  );
}
