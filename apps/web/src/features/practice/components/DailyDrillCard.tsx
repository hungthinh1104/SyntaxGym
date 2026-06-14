import { useEffect, useState } from "react";
import type { Snippet } from "@syntaxgym/content";
import { getDailyDrillSnippet } from "@syntaxgym/content";
import { createLocalDailyDrillRepository, type DailyDrillProgress } from "@syntaxgym/storage";
import { localDateString } from "@syntaxgym/shared";
import { ui } from "../../../lib/ui";

const repository = createLocalDailyDrillRepository();

type Props = {
  currentContext?: string | null;
  onStartDailyDrill: (snippet: Snippet) => void;
};

export function DailyDrillCard({ currentContext, onStartDailyDrill }: Props) {
  const [progress, setProgress] = useState<DailyDrillProgress | null>(null);
  
  useEffect(() => {
    void repository.get().then(setProgress);
  }, [currentContext]); // Re-fetch progress if context changes (e.g. daily drill completed)

  const dailySnippet = getDailyDrillSnippet(localDateString());
  
  if (!dailySnippet || !progress) {
    return null;
  }

  const today = localDateString();
  const isCompletedToday = progress.completedDates.includes(today);

  if (isCompletedToday) {
    return (
      <div className={ui.panel + " flex flex-col sm:flex-row justify-between items-start sm:items-center bg-code-rust/5 border-code-rust/30 py-16"}>
        <div>
          <h2 className={ui.headingSm + " text-code-rust flex items-center gap-8"}>
            <span>🎉</span> Daily drill complete
          </h2>
          <p className={ui.body + " mt-4"}>Great job! Come back tomorrow to keep your streak going.</p>
        </div>
        <div className="mt-16 sm:mt-0 flex items-center gap-8 shrink-0">
          <span className="text-2xl">🔥</span>
          <div className="flex flex-col">
            <span className="text-body font-bold text-sst-ink">{progress.streak}</span>
            <span className={ui.eyebrow}>Day Streak</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={ui.panel + " flex flex-col gap-16 border-sst-ink/20"}>
      <div className="flex justify-between items-start">
        <h2 className={ui.headingSm + " flex items-center gap-8"}>
          <span>📅</span> Today's Drill
        </h2>
        {progress.streak > 0 && (
          <div className="flex items-center gap-4 bg-lavender-mist px-8 py-4 rounded-md">
            <span>🔥</span>
            <span className="text-caption font-bold">{progress.streak}</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-8">
        <strong className="text-body font-semibold">{dailySnippet.title}</strong>
        <p className={ui.body}>{dailySnippet.description}</p>
        <span className={ui.eyebrow + " text-mist"}>Stored locally in this browser.</span>
      </div>

      <button
        onClick={() => onStartDailyDrill(dailySnippet)}
        className={ui.ghostButton + " w-full sm:w-auto self-start mt-8 bg-sst-ink text-paper hover:bg-slate border-transparent hover:text-paper"}
      >
        Start daily drill
      </button>
    </div>
  );
}
