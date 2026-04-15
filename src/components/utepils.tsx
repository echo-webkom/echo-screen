import { useUtepils } from "../hooks/use-utepils";

function getBackgroundClass(score: number) {
  if (score >= 75) return "bg-gradient-to-br from-amber-200 via-orange-200 to-yellow-100";
  if (score >= 45) return "bg-gradient-to-br from-sky-200 via-blue-100 to-slate-100";
  return "bg-gradient-to-br from-slate-300 via-slate-200 to-zinc-100";
}

function getBarClass(score: number) {
  if (score >= 70) return "bg-green-500";
  if (score >= 40) return "bg-amber-400";
  return "bg-red-500";
}

export default function UtepilsCard() {
  const { verdict, score, loading, error } = useUtepils();
  console.log("Utepils verdict:", verdict, "Score:", score, "Loading:", loading, "Error:", error);
  const title = verdict?.title || "Laster...";
  const subtitle = verdict?.subtitle || "Henter utepils-data";
  const emoji = verdict?.emoji || "⏳";

  return (
    <div
      className={`${getBackgroundClass(score)} rounded-2xl p-4 min-w-[240px] max-w-[320px] border border-yellow-200 font-sans`}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-[11px] font-medium tracking-widest text-[#a89060] uppercase mb-1">
            Utepils-meter
          </div>
          <span className="text-[22px] font-bold text-[#1a1a2e]">{title}</span>
          <div className="text-[13px] text-[#7a6a4a] mt-0.5">{subtitle}</div>
        </div>
        <span className="text-[22px]">{emoji}</span>
      </div>

      <div className="bg-[#1a1a2e] rounded-xl px-4 py-2.5 mt-3">
        <div className="text-[10px] text-gray-400 tracking-widest uppercase">Utepils-score</div>
        <div className="text-[28px] font-bold text-white leading-tight">{score}%</div>
        <div className="mt-2 bg-[#333] rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-in-out ${getBarClass(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
}
