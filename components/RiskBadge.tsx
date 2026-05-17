import { riskColor } from "@/lib/scoring/risk";
import type { RiskLabel } from "@/lib/types";

export function RiskBadge({ label, score }: { label: RiskLabel; score?: number }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-white/60 px-3 py-1 text-sm font-semibold text-white shadow-sm"
      style={{ backgroundColor: riskColor(label) }}
    >
      <span className="h-2 w-2 rounded-full bg-white" />
      {label}{typeof score === "number" ? ` · ${score}` : ""}
    </span>
  );
}
