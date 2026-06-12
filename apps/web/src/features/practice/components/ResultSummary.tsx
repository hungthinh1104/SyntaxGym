import type { TokenReport } from "@syntaxgym/code-analysis";
import type { TypingScore, TypingSession } from "@syntaxgym/typing-core";
import { ui } from "../../../lib/ui";

type Props = {
  session: TypingSession;
  score: TypingScore;
  tokenReport: TokenReport;
};

export function ResultSummary({ session, score, tokenReport }: Props) {
  return (
    <div className="flex flex-col gap-32">
      <div>
        <h3 className={ui.heading + " mb-16"}>Session report</h3>
        <ul className="flex flex-col">
          <Row label="Adjusted WPM" value={score.adjustedWpm.toString()} />
          <Row label="Raw WPM" value={score.rawWpm.toString()} />
          <Row label="Accuracy" value={`${score.accuracy}%`} />
          <Row label="Mistakes" value={session.mistakes.length.toString()} />
          <Row label="Typed chars" value={score.typedCharacters.toString()} />
        </ul>
      </div>

      <div>
        <h4 className={ui.eyebrow + " mb-12"}>Weak Rust tokens</h4>
        {tokenReport.weakTokens.length === 0 ? (
          <p className={ui.body}>No weak Rust token detected yet.</p>
        ) : (
          <ul className="flex flex-col">
            {tokenReport.weakTokens.slice(0, 8).map((item) => (
              <li key={item.token} className="flex items-center justify-between border-b border-lavender-mist py-8">
                <code className="rounded-md bg-lavender-mist px-8 py-2 font-ibm-plex-mono text-caption font-semibold text-sst-ink">
                  {item.token}
                </code>
                <span className="text-caption text-fog">{item.misses} miss{item.misses > 1 ? "es" : ""}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h4 className={ui.eyebrow + " mb-12"}>Raw mistake categories</h4>
        {session.mistakes.length === 0 ? (
          <p className={ui.body}>No mistakes.</p>
        ) : (
          <ul className="flex flex-col">
            {session.mistakes.slice(-8).map((mistake) => (
              <li key={mistake.id} className="flex items-center justify-between border-b border-lavender-mist py-8">
                <div className="flex items-center gap-8">
                  <code className="rounded-md bg-lavender-mist px-8 py-2 font-ibm-plex-mono text-caption font-semibold text-sst-ink">
                    {printable(mistake.expected)}
                  </code>
                  <span className="text-caption text-mist">typed</span>
                  <code className="rounded-md bg-code-rust/10 px-8 py-2 font-ibm-plex-mono text-caption font-semibold text-code-rust">
                    {printable(mistake.actual)}
                  </code>
                </div>
                <small className="text-caption text-fog">{mistake.category}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between border-b border-lavender-mist py-8">
      <span className={ui.body}>{label}</span>
      <strong className={ui.body + " font-medium text-sst-ink"}>{value}</strong>
    </li>
  );
}

function printable(value: string): string {
  if (value === "\n") return "\\n";
  if (value === " ") return "space";
  if (value === "\t") return "\\t";
  return value;
}
