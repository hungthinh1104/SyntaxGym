import type { TypingScore, TypingSession } from "@syntaxgym/typing-core";
import { ui } from "../../../lib/ui";

type Props = {
  session: TypingSession;
  score: TypingScore;
};

export function PracticeStatsBar({ session, score }: Props) {
  const progress = session.source.length === 0 ? 100 : Math.round((session.cursorIndex / session.source.length) * 100);

  return (
    <div className="grid grid-cols-5 gap-8 border-y border-lavender-mist py-12">
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
    <div>
      <span className={ui.eyebrow + " block"}>{label}</span>
      <strong className="font-ibm-plex-mono text-heading-sm text-sst-ink">{value}</strong>
    </div>
  );
}
