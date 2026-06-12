import { useMemo, useState } from "react";
import type { Snippet } from "@syntaxgym/content";
import { buildRustTokenReport } from "@syntaxgym/code-analysis";
import { calculateScore } from "@syntaxgym/typing-core";
import { createLocalSessionHistoryRepository } from "@syntaxgym/storage";
import { nowIso } from "@syntaxgym/shared";
import { CodeTypingArea } from "./components/CodeTypingArea";
import { PracticeStatsBar } from "./components/PracticeStatsBar";
import { ResultSummary } from "./components/ResultSummary";
import { Seo } from "../../components/Seo";
import { useTypingSessionController } from "./hooks/useTypingSessionController";
import { ui } from "../../lib/ui";

type Props = {
  snippet: Snippet;
};

const historyRepository = createLocalSessionHistoryRepository();

export function PracticeScreen({ snippet }: Props) {
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const controller = useTypingSessionController(snippet);

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

  return (
    <div className="flex flex-col gap-32 w-full lg:flex-row lg:items-start max-w-[1200px] mx-auto">
      <Seo
        title="Practice Rust Code Typing | SyntaxGym"
        description="Practice Rust syntax and DSA code snippets with token-aware typing feedback."
      />
      <div className="flex-1 flex flex-col gap-32 w-full min-w-0">
        <div className="flex justify-between items-start">
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

        <PracticeStatsBar session={controller.session} score={score} />

        <CodeTypingArea
          session={controller.session}
          onCharacter={controller.typeCharacter}
          onBackspace={controller.backspace}
        />
      </div>

      <aside className="w-full lg:w-[320px] flex flex-col gap-32 shrink-0">
        <ResultSummary
          session={controller.session}
          score={score}
          tokenReport={tokenReport}
        />

        {controller.session.status === "finished" && (
          <div className="flex flex-col gap-16 pt-16 border-t border-lavender-mist">
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
            {savedMessage && (
              <p className="text-caption text-code-teal text-center mt-8">
                {savedMessage}
              </p>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
