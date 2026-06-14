import type { TypingScore, TypingSession } from "@syntaxgym/typing-core";
import { getUniqueMistakes } from "@syntaxgym/typing-core";
import { useEffect, useState } from "react";
import { ui } from "../../../lib/ui";

type Props = {
  session: TypingSession;
  score: TypingScore;
};

export function PracticeStatsBar({ session, score }: Props) {
  const progress = session.source.length === 0 ? 100 : Math.round((session.cursorIndex / session.source.length) * 100);
  const timeStr = useLiveTimer(session.startedAt, session.finishedAt);
  const mistakesCount = getUniqueMistakes(session.mistakes).length;

  return (
    <div className="flex flex-col gap-16 bg-white border border-lavender-mist rounded-lg p-24 shadow-sm">
      <h3 className={ui.eyebrow}>Live Stats</h3>
      <div className="grid grid-cols-2 gap-y-16 gap-x-8">
        <Stat label="Time" value={timeStr} />
        <Stat label="WPM" value={score.adjustedWpm.toString()} />
        <Stat label="Accuracy" value={`${score.accuracy}%`} />
        <Stat label="Mistakes" value={mistakesCount.toString()} />
        <Stat label="Progress" value={`${progress}%`} />
        <Stat label="Status" value={session.status} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-4">
      <span className={ui.eyebrow}>{label}</span>
      <strong className="font-ibm-plex-mono text-[24px] leading-tight text-sst-ink font-semibold">{value}</strong>
    </div>
  );
}

function useLiveTimer(startedAt: number | null, finishedAt: number | null) {
  const [now, setNow] = useState(() => Date.now());
  
  useEffect(() => {
    if (startedAt && !finishedAt) {
      const interval = setInterval(() => setNow(Date.now()), 100);
      return () => clearInterval(interval);
    }
  }, [startedAt, finishedAt]);
  
  if (!startedAt) return "0.0s";
  const duration = finishedAt ? finishedAt - startedAt : now - startedAt;
  return (Math.max(0, duration) / 1000).toFixed(1) + "s";
}
