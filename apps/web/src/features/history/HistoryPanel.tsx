import { useEffect, useState } from "react";
import {
  createLocalSessionHistoryRepository,
  type PersistedSessionResult
} from "@syntaxgym/storage";

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
    <section className="panel">
      <div className="snippet-header">
        <div>
          <h3>Session history</h3>
          <p className="muted">Stored locally in this browser.</p>
        </div>

        <button onClick={clear}>Clear</button>
      </div>

      {history.length === 0 ? (
        <p className="muted">No saved sessions yet.</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <article key={item.id} className="history-item">
              <div>
                <strong>{item.snippetTitle}</strong>
                <p className="muted">{new Date(item.finishedAt).toLocaleString()}</p>
              </div>

              <div className="history-stats">
                <span>{item.adjustedWpm} WPM</span>
                <span>{item.accuracy}% acc</span>
                <span>{item.mistakes} mistakes</span>
              </div>

              {item.weakTokens.length > 0 && (
                <p className="muted">
                  Weak: {item.weakTokens.slice(0, 5).map((token) => `${token.token}(${token.misses})`).join(", ")}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
