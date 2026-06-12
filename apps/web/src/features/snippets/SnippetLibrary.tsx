import { useEffect, useMemo, useState } from "react";
import { builtInSnippets, type Snippet } from "@syntaxgym/content";
import { createLocalSnippetRepository } from "@syntaxgym/storage";
import { createId, nowIso } from "@syntaxgym/shared";
import { Seo } from "../../components/Seo";
import { ui } from "../../lib/ui";

type Props = {
  selectedSnippetId: string;
  onSelect: (snippet: Snippet) => void;
};

const repository = createLocalSnippetRepository();

export function SnippetLibrary({ selectedSnippetId, onSelect }: Props) {
  const [customSnippets, setCustomSnippets] = useState<Snippet[]>([]);
  const [topicFilter, setTopicFilter] = useState<string>("All");

  const [customTitle, setCustomTitle] = useState("");
  const [customCode, setCustomCode] = useState("");

  useEffect(() => {
    void repository.listCustom().then(setCustomSnippets);
  }, []);

  const allSnippets = useMemo(() => {
    return [...customSnippets, ...builtInSnippets];
  }, [customSnippets]);

  const topics = useMemo(() => {
    const set = new Set<string>();
    allSnippets.forEach((s) => set.add(s.topic));
    return ["All", ...Array.from(set)].sort();
  }, [allSnippets]);

  const filteredSnippets = useMemo(() => {
    if (topicFilter === "All") return allSnippets;
    return allSnippets.filter((s) => s.topic === topicFilter);
  }, [allSnippets, topicFilter]);

  async function saveCustomSnippet() {
    if (!customCode.trim()) return;

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
    setCustomTitle("");
    setTopicFilter("custom");
    onSelect(snippet);
  }

  return (
    <section className="w-full flex flex-col gap-32">
      <Seo
        title="Snippet Library | SyntaxGym"
        description="Choose built-in Rust and DSA snippets or save custom code snippets for typing practice."
      />
      <div>
        <h2 className={ui.heading + " mb-16"}>Snippet Library</h2>
        <p className={ui.body}>
          Select a Rust snippet to practice your typing speed and syntax muscle memory, or paste your own.
        </p>
      </div>

      <div className={ui.panel + " flex flex-col gap-16"}>
        <h3 className={ui.headingSm}>Practice Custom Code</h3>
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
          <input
            type="text"
            placeholder="Snippet Title (optional)"
            className="w-full lg:w-1/4 rounded-md border border-lavender-mist bg-paper px-12 py-8 text-body focus:border-sst-ink focus:outline-none"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
          />
          <textarea
            placeholder="Paste your Rust code here..."
            className="w-full lg:w-2/4 h-64 lg:h-auto min-h-[44px] rounded-md border border-lavender-mist bg-paper px-12 py-8 font-ibm-plex-mono text-body focus:border-sst-ink focus:outline-none resize-y"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            rows={1}
          />
          <button
            onClick={saveCustomSnippet}
            disabled={!customCode.trim()}
            className={ui.ghostButton + " lg:w-1/4 disabled:opacity-50"}
          >
            Save & Practice
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-32">
        <aside className="w-full lg:w-[240px] shrink-0">
          <h3 className={ui.eyebrow + " mb-16"}>Topics</h3>
          <ul className="flex flex-row lg:flex-col gap-4 overflow-auto pb-4 lg:pb-0">
            {topics.map((topic) => (
              <li key={topic} className="shrink-0">
                <button
                  onClick={() => setTopicFilter(topic)}
                  className={
                    topicFilter === topic
                      ? `${ui.navButton} w-full text-left bg-lavender-mist text-sst-ink`
                      : `${ui.navButton} w-full text-left`
                  }
                >
                  {topic}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {filteredSnippets.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => onSelect(snippet)}
              className={
                "rounded-lg border border-lavender-mist p-16 text-left transition-colors " +
                (selectedSnippetId === snippet.id
                  ? "bg-lavender-mist border-sst-ink"
                  : "bg-paper hover:bg-lavender-mist")
              }
            >
              <div className="flex justify-between items-start mb-4">
                <p className={ui.eyebrow}>
                  {snippet.language} · {snippet.topic}
                </p>
                {snippet.topic === "custom" && (
                  <span className="text-caption text-code-plum font-semibold">User</span>
                )}
              </div>
              <strong className="block text-body font-semibold text-sst-ink mb-4">
                {snippet.title}
              </strong>
              <span className={ui.body + " block"}>
                {snippet.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
