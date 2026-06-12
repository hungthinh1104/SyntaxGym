import { useEffect, useMemo, useState } from "react";
import { builtInSnippets, type Snippet } from "@syntaxgym/content";
import { createId, nowIso } from "@syntaxgym/shared";
import { createLocalSnippetRepository } from "@syntaxgym/storage";

type Props = {
  selectedSnippetId: string;
  onSelect: (snippet: Snippet) => void;
};

const repository = createLocalSnippetRepository();

export function SnippetLibrary({ selectedSnippetId, onSelect }: Props) {
  const [customSnippets, setCustomSnippets] = useState<Snippet[]>([]);
  const [query, setQuery] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [customTitle, setCustomTitle] = useState("My Rust snippet");

  useEffect(() => {
    void repository.listCustom().then(setCustomSnippets);
  }, []);

  const snippets = useMemo(() => {
    const all = [...customSnippets, ...builtInSnippets];
    const normalized = query.trim().toLowerCase();

    if (!normalized) return all;

    return all.filter((snippet) => {
      return [
        snippet.title,
        snippet.description,
        snippet.language,
        snippet.topic,
        snippet.dsaPattern,
        snippet.tags.join(" ")
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    });
  }, [customSnippets, query]);

  async function saveCustomSnippet() {
    const now = nowIso();
    const snippet: Snippet = {
      id: createId("snippet"),
      title: customTitle.trim() || "Untitled snippet",
      description: "Manual pasted snippet.",
      language: "rust",
      topic: "custom",
      dsaPattern: "none",
      difficulty: "easy",
      source: "manual_paste",
      tags: ["custom", "rust"],
      code: customCode,
      createdAt: now,
      updatedAt: now
    };

    await repository.saveCustom(snippet);
    setCustomSnippets(await repository.listCustom());
    setCustomCode("");
    setCustomTitle("My Rust snippet");
  }

  return (
    <section className="library-grid">
      <div className="panel">
        <h3>Add custom Rust snippet</h3>

        <label className="field">
          <span>Title</span>
          <input value={customTitle} onChange={(event) => setCustomTitle(event.target.value)} />
        </label>

        <label className="field">
          <span>Code</span>
          <textarea
            value={customCode}
            onChange={(event) => setCustomCode(event.target.value)}
            placeholder="Paste Rust code here..."
            rows={14}
          />
        </label>

        <button disabled={customCode.trim().length === 0} onClick={saveCustomSnippet}>
          Save custom snippet
        </button>
      </div>

      <div className="panel">
        <div className="snippet-list-header">
          <h3>Snippets</h3>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search snippets..."
          />
        </div>

        <div className="snippet-list">
          {snippets.map((snippet) => (
            <button
              key={snippet.id}
              className={`snippet-card ${snippet.id === selectedSnippetId ? "selected" : ""}`}
              onClick={() => onSelect(snippet)}
            >
              <span className="eyebrow">{snippet.language} · {snippet.topic} · {snippet.source}</span>
              <strong>{snippet.title}</strong>
              <span>{snippet.description}</span>
              <small>{snippet.tags.join(", ")}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
