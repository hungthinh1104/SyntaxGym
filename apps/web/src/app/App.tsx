import { useMemo, useState } from "react";
import { builtInSnippets, type Snippet } from "@syntaxgym/content";
import { PracticeScreen } from "../features/practice/PracticeScreen";
import { SnippetLibrary } from "../features/snippets/SnippetLibrary";
import { HistoryPanel } from "../features/history/HistoryPanel";

type Page = "practice" | "library" | "history";

export function App() {
  const [page, setPage] = useState<Page>("practice");
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet>(builtInSnippets[0]!);

  const title = useMemo(() => {
    if (page === "practice") return "Practice";
    if (page === "library") return "Snippet Library";
    return "History";
  }, [page]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <h1>SyntaxGym</h1>
          <p className="muted">Rust syntax + DSA code typing trainer.</p>
        </div>

        <nav className="nav">
          <button className={page === "practice" ? "active" : ""} onClick={() => setPage("practice")}>
            Practice
          </button>
          <button className={page === "library" ? "active" : ""} onClick={() => setPage("library")}>
            Snippets
          </button>
          <button className={page === "history" ? "active" : ""} onClick={() => setPage("history")}>
            History
          </button>
        </nav>

        <div className="sidebar-note">
          <strong>Rule:</strong> train accuracy first. Speed comes later.
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Local-first · no login · no paywall</p>
            <h2>{title}</h2>
          </div>
        </header>

        {page === "practice" && <PracticeScreen snippet={selectedSnippet} />}
        {page === "library" && (
          <SnippetLibrary
            selectedSnippetId={selectedSnippet.id}
            onSelect={(snippet) => {
              setSelectedSnippet(snippet);
              setPage("practice");
            }}
          />
        )}
        {page === "history" && <HistoryPanel />}
      </main>
    </div>
  );
}
