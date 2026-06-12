import { useEffect, useState } from "react";
import {
  createLocalSessionHistoryRepository,
  type PersistedSessionResult
} from "@syntaxgym/storage";
import { Seo } from "../../components/Seo";
import { ui } from "../../lib/ui";

const repository = createLocalSessionHistoryRepository();

export function HistoryPanel() {
  const [history, setHistory] = useState<PersistedSessionResult[]>([]);

  async function reload() {
    setHistory(await repository.list());
  }

  async function clear() {
    await repository.clear();
    await reload();
  }

  useEffect(() => {
    void reload();
  }, []);

  return (
    <section className="flex flex-col gap-32 w-full">
      <Seo
        title="Typing History | SyntaxGym"
        description="Review saved local typing sessions, WPM, accuracy, mistakes, and weak Rust tokens."
      />
      <div className="flex justify-between items-start pb-16 border-b border-lavender-mist">
        <div>
          <h3 className={ui.heading + " mb-4"}>Session history</h3>
          <p className={ui.body}>Stored locally in this browser.</p>
        </div>

        <button 
          onClick={clear}
          className={ui.ghostButton}
        >
          Clear
        </button>
      </div>

      {history.length === 0 ? (
        <p className={ui.body + " text-fog"}>No saved sessions yet.</p>
      ) : (
        <div className="flex flex-col gap-16">
          {history.map((item) => (
            <article key={item.id} className={ui.panel + " flex flex-col gap-16"}>
              <div className="flex justify-between items-start">
                <div>
                  <strong className="block text-body font-semibold text-sst-ink mb-4">{item.snippetTitle}</strong>
                  <p className="text-caption text-mist">{new Date(item.finishedAt).toLocaleString()}</p>
                </div>

                <div className="flex gap-16 items-center">
                  <div className="flex flex-col items-end">
                    <span className={ui.eyebrow}>WPM</span>
                    <span className="font-ibm-plex-mono text-body font-semibold text-sst-ink">{item.adjustedWpm}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={ui.eyebrow}>Accuracy</span>
                    <span className="font-ibm-plex-mono text-body font-semibold text-sst-ink">{item.accuracy}%</span>
                  </div>
                </div>
              </div>

              {item.weakTokens.length > 0 && (
                <div className="flex gap-8 items-center flex-wrap pt-8 border-t border-lavender-mist/50">
                  <span className="text-caption text-slate">Weak tokens:</span>
                  {item.weakTokens.slice(0, 5).map((token) => (
                    <span key={token.token} className="px-8 py-2 bg-lavender-mist font-ibm-plex-mono text-caption text-code-plum rounded-md font-semibold">
                      {token.token} <span className="text-mist opacity-70">({token.misses})</span>
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
