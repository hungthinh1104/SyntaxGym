import { useState } from "react";
import { builtInSnippets, type Snippet } from "@syntaxgym/content";
import { Routes, Route, Navigate, NavLink, Link } from "react-router-dom";
import { PracticeScreen } from "../features/practice/PracticeScreen";
import { SnippetLibrary } from "../features/snippets/SnippetLibrary";
import { HistoryPanel } from "../features/history/HistoryPanel";
import { DocsLayout } from "../features/docs/DocsLayout";
import { DocsIndex } from "../features/docs/pages/DocsIndex";
import { WhatIsSyntaxGym } from "../features/docs/pages/WhatIsSyntaxGym";
import { RustTypingPractice } from "../features/docs/pages/RustTypingPractice";
import { ui } from "../lib/ui";

export function App() {
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet>(builtInSnippets[0]!);

  return (
    <div className="min-h-screen bg-paper text-sst-ink font-rubik-variable flex flex-col">
      <header className="sticky top-0 z-20 border-b border-lavender-mist bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-24">
          <Link to="/" className="flex items-center gap-4">
            <span className="text-[18px]">⚡</span>
            <span className="text-body font-semibold tracking-wide">SyntaxGym</span>
            <span className="font-ibm-plex-mono text-mist text-caption ml-4">&gt;_</span>
          </Link>

          <nav className="flex items-center gap-2">
            <NavLink
              to="/practice"
              className={({ isActive }) => (isActive ? ui.activeNavButton : ui.navButton)}
            >
              Practice
            </NavLink>
            <NavLink
              to="/snippets"
              className={({ isActive }) => (isActive ? ui.activeNavButton : ui.navButton)}
            >
              Snippets
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) => (isActive ? ui.activeNavButton : ui.navButton)}
            >
              History
            </NavLink>
            <NavLink
              to="/docs"
              className={({ isActive }) => (isActive ? ui.activeNavButton : ui.navButton)}
            >
              Docs
            </NavLink>
          </nav>

          <div className="flex items-center">
            {/* Optional right utility link/button */}
          </div>
        </div>
      </header>

      <main className={ui.page + " flex-1"}>
        <Routes>
          <Route path="/" element={<Navigate to="/practice" replace />} />
          <Route path="/practice" element={<PracticeScreen snippet={selectedSnippet} />} />
          <Route
            path="/snippets"
            element={
              <SnippetLibrary
                selectedSnippetId={selectedSnippet.id}
                onSelect={(snippet) => setSelectedSnippet(snippet)}
              />
            }
          />
          <Route path="/history" element={<HistoryPanel />} />
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<DocsIndex />} />
            <Route path="what-is-syntaxgym" element={<WhatIsSyntaxGym />} />
            <Route path="rust-typing-practice" element={<RustTypingPractice />} />
          </Route>
        </Routes>
      </main>
      
      <footer className="w-full border-t border-lavender-mist flex justify-center py-16 mt-auto">
        <div className="mx-auto flex max-w-[1200px] w-full justify-between items-center px-24 text-caption text-fog">
          <span>Local-first · No login required</span>
          <div className="flex gap-16">
            <Link to="/docs" className="hover:text-sst-ink transition-colors">Guide</Link>
            <a href="#" className="hover:text-sst-ink transition-colors">About</a>
            <a href="#" className="hover:text-sst-ink transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
