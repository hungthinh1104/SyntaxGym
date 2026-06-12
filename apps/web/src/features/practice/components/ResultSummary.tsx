import type { TokenReport } from "@syntaxgym/code-analysis";
import type { TypingScore, TypingSession } from "@syntaxgym/typing-core";

type Props = {
  session: TypingSession;
  score: TypingScore;
  tokenReport: TokenReport;
};

export function ResultSummary({ session, score, tokenReport }: Props) {
  return (
    <div className="result-summary">
      <h3>Session report</h3>

      <div className="summary-list">
        <Row label="Adjusted WPM" value={score.adjustedWpm.toString()} />
        <Row label="Raw WPM" value={score.rawWpm.toString()} />
        <Row label="Accuracy" value={`${score.accuracy}%`} />
        <Row label="Mistakes" value={session.mistakes.length.toString()} />
        <Row label="Typed chars" value={score.typedCharacters.toString()} />
      </div>

      <h4>Weak Rust tokens</h4>
      {tokenReport.weakTokens.length === 0 ? (
        <p className="muted">No weak Rust token detected yet.</p>
      ) : (
        <ul className="weak-token-list">
          {tokenReport.weakTokens.slice(0, 8).map((item) => (
            <li key={item.token}>
              <code>{item.token}</code>
              <span>{item.misses} miss{item.misses > 1 ? "es" : ""}</span>
            </li>
          ))}
        </ul>
      )}

      <h4>Raw mistake categories</h4>
      {session.mistakes.length === 0 ? (
        <p className="muted">No mistakes.</p>
      ) : (
        <ul className="mistake-list">
          {session.mistakes.slice(-8).map((mistake) => (
            <li key={mistake.id}>
              <code>{printable(mistake.expected)}</code>
              <span>typed</span>
              <code>{printable(mistake.actual)}</code>
              <small>{mistake.category}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function printable(value: string): string {
  if (value === "\n") return "\\n";
  if (value === " ") return "space";
  if (value === "\t") return "\\t";
  return value;
}
