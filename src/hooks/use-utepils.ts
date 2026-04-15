import { useState, useEffect } from "react";

export type Verdict = {
  title: string;
  subtitle: string;
  emoji: string;
  score: number;
};

export function useUtepils() {
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://utepils-ten.vercel.app/api/utepils/bergen")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        console.log("Fetched utepils data:", res);
        return res.json();
      })
      .then((data) => {
        setVerdict(data.verdict);
        setScore(data.score);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { verdict, score, loading, error };
}
