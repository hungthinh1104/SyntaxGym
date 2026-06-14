import { useEffect, useMemo, useState } from "react";
import type { Snippet } from "@syntaxgym/content";
import { builtInSnippets, practicePacks } from "@syntaxgym/content";
import { buildRustTokenReport, generateRetrySnippet } from "@syntaxgym/code-analysis";
import { calculateScore } from "@syntaxgym/typing-core";
import { createLocalSessionHistoryRepository } from "@syntaxgym/storage";
import { CodeTypingArea } from "./components/CodeTypingArea";
import { PracticeStatsBar } from "./components/PracticeStatsBar";
import { ResultSummary } from "./components/ResultSummary";
import { DailyDrillCard } from "./components/DailyDrillCard";
import { Seo } from "../../components/Seo";
import { useTypingSessionController } from "./hooks/useTypingSessionController";
import { ui } from "../../lib/ui";
import { createLocalDailyDrillRepository } from "@syntaxgym/storage";
import { localDateString, nowIso } from "@syntaxgym/shared";

type Props = {
  snippet: Snippet;
  selectedPackId?: string | null;
  sessionContext?: string | null;
  onSelectSnippet?: (snippet: Snippet, packId?: string | null, context?: string | null) => void;
};

const historyRepository = createLocalSessionHistoryRepository();

export function PracticeScreen({ snippet, selectedPackId, sessionContext, onSelectSnippet }: Props) {
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [dailyDrillCompletedStreak, setDailyDrillCompletedStreak] = useState<number | null>(null);
  const controller = useTypingSessionController(snippet);

  useEffect(() => {
    if (controller.session.status === "finished" && sessionContext === "daily-drill" && dailyDrillCompletedStreak === null) {
      let active = true;
      void createLocalDailyDrillRepository().complete(localDateString()).then((progress) => {
        if (active) setDailyDrillCompletedStreak(progress.streak);
      });
      return () => { active = false; };
    }
  }, [controller.session.status, sessionContext, dailyDrillCompletedStreak]);

  const score = useMemo(
    () => calculateScore(controller.session),
    [controller.session]
  );

  const tokenReport = useMemo(
    () =>
      buildRustTokenReport({
        source: controller.session.source,
        mistakes: controller.session.mistakes
      }),
    [controller.session.source, controller.session.mistakes]
  );

  async function saveResult() {
    const currentScore = calculateScore(controller.session);
    const currentReport = buildRustTokenReport({
      source: controller.session.source,
      mistakes: controller.session.mistakes
    });

    await historyRepository.save({
      id: controller.session.id,
      snippetId: snippet.id,
      snippetTitle: snippet.title,
      language: snippet.language,
      finishedAt: nowIso(),
      durationMs: currentScore.durationMs,
      adjustedWpm: currentScore.adjustedWpm,
      accuracy: currentScore.accuracy,
      mistakes: controller.session.mistakes.length,
      weakTokens: currentReport.weakTokens.map((item) => ({
        token: item.token,
        misses: item.misses
      }))
    });

    setSavedMessage("Saved to history.");
  }

  function handleRetryClick() {
    if (!onSelectSnippet) return;
    const currentReport = buildRustTokenReport({
      source: controller.session.source,
      mistakes: controller.session.mistakes
    });
    const retrySnippet = generateRetrySnippet(currentReport.weakTokens);
    if (retrySnippet) {
      onSelectSnippet(retrySnippet as Snippet, null, null); // Clear packId and context when retrying
    }
  }

  const currentPack = selectedPackId ? practicePacks.find(p => p.id === selectedPackId) : null;
  const currentIndexInPack = currentPack ? currentPack.snippetIds.indexOf(snippet.id) : -1;
  const nextSnippetId = currentPack && currentIndexInPack >= 0 && currentIndexInPack < currentPack.snippetIds.length - 1 
    ? currentPack.snippetIds[currentIndexInPack + 1] 
    : null;
  const nextSnippet = nextSnippetId ? builtInSnippets.find(s => s.id === nextSnippetId) : null;

  function handleNextSnippetClick() {
    if (onSelectSnippet && nextSnippet) {
      onSelectSnippet(nextSnippet, selectedPackId, null);
    }
  }

  return (
    <div className="flex flex-col gap-24 w-full mx-auto">
      <Seo
        title="Practice Rust Code Typing | SyntaxGym"
        description="Practice Rust syntax and DSA code snippets with token-aware typing feedback."
      />

      <div className="flex flex-col gap-16">
        <DailyDrillCard 
          currentContext={sessionContext ?? null} 
          onStartDailyDrill={(s) => onSelectSnippet?.(s, null, "daily-drill")} 
        />
        
        <div className="flex flex-col sm:flex-row gap-16 sm:gap-0 justify-between items-start">
          <div className="max-w-[600px]">
            <p className={ui.eyebrow + " mb-8"}>
              {snippet.language} · {snippet.topic} · {snippet.difficulty}
            </p>
            <h1 className={ui.heading + " mb-8"}>
              {snippet.title}
            </h1>
            <p className={ui.body}>
              {snippet.description}
            </p>
          </div>

          <button 
            onClick={controller.reset}
            className={ui.ghostButton + " flex items-center gap-4 shrink-0"}
          >
            Reset <span className="font-ibm-plex-mono">&gt;</span>
          </button>
        </div>
      </div>

      <div className="grid gap-24 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="min-w-0 flex flex-col gap-32 order-2 lg:order-1">
          <CodeTypingArea
            session={controller.session}
            onCharacter={controller.typeCharacter}
            onBackspace={controller.backspace}
          />
          
          {controller.session.status === "finished" && (
            <div className="flex flex-col gap-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ResultSummary
                session={controller.session}
                score={score}
                tokenReport={tokenReport}
                dailyDrillStreak={dailyDrillCompletedStreak}
                onRetryClick={onSelectSnippet ? handleRetryClick : undefined}
              />

              <div className="flex flex-wrap gap-16 pt-16 border-t border-lavender-mist">
                <button 
                  onClick={saveResult}
                  className={ui.ghostButton + " flex justify-center items-center gap-8 border-sst-ink"}
                >
                  Save result <span className="font-ibm-plex-mono text-mist">&gt;</span>
                </button>
                <button 
                  onClick={controller.reset}
                  className={ui.ghostButton + " flex justify-center items-center gap-8"}
                >
                  Try again <span className="font-ibm-plex-mono text-mist">&gt;</span>
                </button>
                {nextSnippet && (
                  <button 
                    onClick={handleNextSnippetClick}
                    className={ui.ghostButton + " flex justify-center items-center gap-8 bg-lavender-mist/50 hover:bg-lavender-mist"}
                  >
                    Next pack snippet <span className="font-ibm-plex-mono text-mist">&gt;</span>
                  </button>
                )}
              </div>
              {savedMessage && (
                <p className="text-caption text-code-teal mt-[-16px]">
                  {savedMessage}
                </p>
              )}
            </div>
          )}
        </main>

        <aside className="lg:sticky lg:top-24 h-fit flex flex-col gap-24 shrink-0 order-1 lg:order-2">
          <PracticeStatsBar session={controller.session} score={score} />
        </aside>
      </div>
    </div>
  );
}
