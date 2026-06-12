import { useMemo, useState } from "react";
import type { Snippet } from "@syntaxgym/content";
import { buildRustTokenReport } from "@syntaxgym/code-analysis";
import { calculateScore } from "@syntaxgym/typing-core";
import { createLocalSessionHistoryRepository } from "@syntaxgym/storage";
import { nowIso } from "@syntaxgym/shared";
import { CodeTypingArea } from "./components/CodeTypingArea";
import { PracticeStatsBar } from "./components/PracticeStatsBar";
import { ResultSummary } from "./components/ResultSummary";
import { useTypingSessionController } from "./hooks/useTypingSessionController";

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
    <section className="practice-grid">
      <div className="panel">
        <div className="snippet-header">
          <div>
            <p className="eyebrow">{snippet.language} · {snippet.topic} · {snippet.difficulty}</p>
            <h3>{snippet.title}</h3>
            <p className="muted">{snippet.description}</p>
          </div>

          <button onClick={controller.reset}>Reset</button>
        </div>

        <PracticeStatsBar session={controller.session} score={score} />

        <CodeTypingArea
          session={controller.session}
          onCharacter={controller.typeCharacter}
          onBackspace={controller.backspace}
        />
      </div>

      <aside className="panel">
        <ResultSummary
          session={controller.session}
          score={score}
          tokenReport={tokenReport}
        />

        {controller.session.status === "finished" && (
          <div className="result-actions">
            <button onClick={saveResult}>Save result</button>
            <button onClick={controller.reset}>Try again</button>
            {savedMessage && <p className="success">{savedMessage}</p>}
          </div>
        )}
      </aside>
    </section>
  );
}
