import type { TypingScore, TypingSession } from "@syntaxgym/typing-core";

type Props = {
  session: TypingSession;
  score: TypingScore;
};

export function PracticeStatsBar({ session, score }: Props) {
  const progress = session.source.length === 0 ? 100 : Math.round((session.cursorIndex / session.source.length) * 100);

  return (
    <div className="stats-bar">
      <Stat label="WPM" value={score.adjustedWpm.toString()} />
      <Stat label="Accuracy" value={`${score.accuracy}%`} />
      <Stat label="Mistakes" value={session.mistakes.length.toString()} />
      <Stat label="Progress" value={`${progress}%`} />
      <Stat label="Status" value={session.status} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
