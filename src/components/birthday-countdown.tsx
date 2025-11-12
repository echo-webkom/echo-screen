"use client";
import { useEffect, useMemo, useState } from "react";

export default function BdayCountDown() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = useMemo(() => {
    const year = now.getFullYear();
    let t = new Date(year, 10 /* Nov */, 7, 21, 0, 0);
    if (now > t) t = new Date(year + 1, 10, 7, 21, 0, 0);
    return t;
  }, [now]);

  const isBirthdayToday = now.getMonth() === 10 && now.getDate() === 7;

  const diff = Math.max(0, target.getTime() - now.getTime());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n: number) => String(n).padStart(2, "0");

  if (isBirthdayToday) {
    return (
      <div className="text-center flex w-100 flex-col justify-center items-center rounded-lg mb-1 pb-20 px-10 py-10 bg-background/70 border-2 shadow-lg">
        <h1 className="font-semibold text-5xl pb-7">echo</h1>
        <p className="text-2xl">Gratulerer med dagen!</p>
        <p className="text-2xl">🥳🎉</p>
      </div>
    );
  }

  return (
    <div className="text-center flex-auto rounded-lg px-10 py-10 bg-background/70 border-2 shadow-lg">
      <h1 className="font-semibold text-3xl mt-5 pb-10 h-20">echo bursdag 🥳</h1>
      <p className="pb-3 h-14">Bursdagsfest om:</p>
      <div className="flex justify-center gap-8 sm:gap-10">
        <TimeBox label="Dager" value={days} />
        <TimeBox label="Timer" value={hours} pad />
        <TimeBox label="Min" value={minutes} pad />
        <TimeBox label="Sek" value={seconds} pad />
      </div>
    </div>
  );

  function TimeBox({
    label,
    value,
    pad: doPad = false
  }: {
    label: string;
    value: number;
    pad?: boolean;
  }) {
    return (
      <div className="flex flex-col items-center w-12">
        <span className="font-semibold text-2xl tabular-nums">{doPad ? pad(value) : value}</span>
        <span className="text-xs">{label}</span>
      </div>
    );
  }
}
