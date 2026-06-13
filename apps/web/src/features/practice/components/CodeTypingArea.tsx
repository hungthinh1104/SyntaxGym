import { useEffect, useMemo, useRef, useState } from "react";
import type { TypingSession } from "@syntaxgym/typing-core";
import { ui } from "../../../lib/ui";

type Props = {
  session: TypingSession;
  onCharacter: (value: string) => void;
  onBackspace: () => void;
};

function buildSyntaxColors(source: string): (string | null)[] {
  const colors: (string | null)[] = new Array(source.length).fill(null);
  
  const keywords = /\b(enum|match|impl|fn|struct|let|mut|if|else|return|pub|for|in)\b/g;
  let match;
  while ((match = keywords.exec(source)) !== null) {
    for (let i = match.index; i < match.index + match[0].length; i++) {
      colors[i] = "text-code-plum font-semibold";
    }
  }

  const types = /\b(Option|Result|Vec|HashMap|String|str|bool|i32|u32|usize|T|E)\b/g;
  while ((match = types.exec(source)) !== null) {
    for (let i = match.index; i < match.index + match[0].length; i++) {
      colors[i] = "text-code-teal";
    }
  }

  const calls = /\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()/g;
  while ((match = calls.exec(source)) !== null) {
    if (!colors[match.index]) {
      for (let i = match.index; i < match.index + match[0].length; i++) {
        colors[i] = "text-code-cobalt";
      }
    }
  }

  return colors;
}

export function CodeTypingArea({ session, onCharacter, onBackspace }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeCursorRef = useRef<HTMLSpanElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const syntaxColors = useMemo(() => buildSyntaxColors(session.source), [session.source]);

  useEffect(() => {
    containerRef.current?.focus();
  }, [session.id]);

  useEffect(() => {
    if (!activeCursorRef.current || !containerRef.current) return;
    
    const rafId = requestAnimationFrame(() => {
      if (!activeCursorRef.current || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const cursorRect = activeCursorRef.current.getBoundingClientRect();
      
      if (
        cursorRect.bottom > containerRect.bottom - 40 ||
        cursorRect.top < containerRect.top + 40
      ) {
        activeCursorRef.current.scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "nearest"
        });
      }
    });
    
    return () => cancelAnimationFrame(rafId);
  }, [session.cursorIndex]);

  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if (session.status === "finished") return;
      if (isFocused) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }
      
      if (e.key.length === 1 || e.key === "Backspace" || e.key === "Enter" || e.key === "Tab") {
        containerRef.current?.focus();
      }
    }
    
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isFocused, session.status]);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    if (event.key === "Backspace") {
      event.preventDefault();
      onBackspace();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      onCharacter("\n");
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      
      let spacesToType = 0;
      for (let i = session.cursorIndex; i < session.source.length; i++) {
        if (session.source[i] === " " && spacesToType < 4) {
          spacesToType++;
        } else {
          break;
        }
      }
      
      if (spacesToType === 0) spacesToType = 4;

      for (let i = 0; i < spacesToType; i++) {
        onCharacter(" ");
      }
      return;
    }

    if (event.key.length === 1) {
      event.preventDefault();
      onCharacter(event.key);
    }
  }

  return (
    <div className="relative min-h-[360px] lg:min-h-[560px]">
      <span id="typing-instruction" className="sr-only">Type the code below. The editor is ready.</span>
      <div
        ref={containerRef}
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={ui.codeBlock + " absolute inset-0 overflow-auto whitespace-pre-wrap tracking-[-0.021em] outline-none focus:ring-1 focus:ring-sst-ink/20 focus:border-sst-ink/30 transition-all"}
        onKeyDown={handleKeyDown}
        aria-label="Code typing area"
        aria-describedby="typing-instruction"
      >
      {Array.from(session.source).map((char, index) => {
        const typedChar = session.typed[index];
        const isTyped = typedChar !== undefined;
        const isCurrent = index === session.cursorIndex;
        const isMistake = isTyped && typedChar !== session.source[index];
        const syntaxClass = syntaxColors[index] || "text-sst-ink";
        
        let charClass = "rounded-[2px] transition-colors ";
        
        if (isCurrent) {
          charClass += "bg-sst-ink text-paper motion-safe:animate-blink ";
        } else if (isMistake) {
          charClass += "bg-code-rust/10 text-code-rust font-semibold ";
        } else if (isTyped) {
          charClass += syntaxClass + " ";
        } else {
          charClass += syntaxClass + " opacity-40 ";
        }

        if (char === "\n") {
          return (
            <span key={index} ref={isCurrent ? activeCursorRef : undefined} className={charClass}>
              {isMistake && "↵"}{"\n"}
            </span>
          );
        }

        if (char === " ") {
          return (
            <span key={index} ref={isCurrent ? activeCursorRef : undefined} className={charClass}>
              {isMistake ? "·" : " "}
            </span>
          );
        }

        if (char === "\t") {
          return (
            <span key={index} ref={isCurrent ? activeCursorRef : undefined} className={charClass}>
              {isMistake ? "⇥" : "  "}
            </span>
          );
        }

        return (
          <span key={index} ref={isCurrent ? activeCursorRef : undefined} className={charClass}>
            {char}
          </span>
        );
      })}
      </div>

      {!isFocused && session.status !== "finished" && (
        <div 
          className="absolute inset-0 z-10 flex items-center justify-center bg-paper/60 backdrop-blur-[2px] cursor-pointer rounded-md transition-all"
          onClick={() => containerRef.current?.focus()}
          aria-hidden="true"
        >
          <span className={ui.eyebrow + " flex items-center gap-8 bg-paper px-16 py-8 rounded-full border border-lavender-mist shadow-sm text-sst-ink"}>
            <span className="w-8 h-8 rounded-full bg-sst-ink animate-pulse" />
            Click the code area to continue typing
          </span>
        </div>
      )}
    </div>
  );
}
