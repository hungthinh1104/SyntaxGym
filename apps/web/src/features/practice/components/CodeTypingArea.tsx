import { useEffect, useMemo, useRef } from "react";
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

  const mistakeIndexSet = useMemo(() => {
    return new Set(session.mistakes.map((mistake) => mistake.index));
  }, [session.mistakes]);

  const syntaxColors = useMemo(() => buildSyntaxColors(session.source), [session.source]);

  useEffect(() => {
    containerRef.current?.focus();
  }, [session.id]);

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
      onCharacter("\t");
      return;
    }

    if (event.key.length === 1) {
      event.preventDefault();
      onCharacter(event.key);
    }
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={ui.codeBlock + " min-h-[560px] max-h-[70vh] overflow-auto whitespace-pre-wrap tracking-[-0.021em] outline-none focus:border-sst-ink/20 transition-all"}
      onKeyDown={handleKeyDown}
      aria-label="Code typing area"
    >
      {Array.from(session.source).map((char, index) => {
        const typedChar = session.typed[index];
        const isTyped = typedChar !== undefined;
        const isCurrent = index === session.cursorIndex;
        const isMistake = mistakeIndexSet.has(index);
        const syntaxClass = syntaxColors[index] || "text-sst-ink";
        
        let charClass = "rounded-[2px] transition-colors ";
        
        if (isCurrent) {
          charClass += "bg-sst-ink text-paper ";
        } else if (isMistake) {
          charClass += "bg-code-rust/10 text-code-rust font-semibold ";
        } else if (isTyped) {
          charClass += syntaxClass + " ";
        } else {
          charClass += "text-mist ";
        }

        if (char === "\n") {
          return (
            <span key={index} className={charClass}>
              {isMistake && "↵"}{"\n"}
            </span>
          );
        }

        if (char === " ") {
          return (
            <span key={index} className={charClass}>
              {isMistake ? "·" : " "}
            </span>
          );
        }

        if (char === "\t") {
          return (
            <span key={index} className={charClass}>
              {isMistake ? "⇥" : "  "}
            </span>
          );
        }

        return (
          <span key={index} className={charClass}>
            {char}
          </span>
        );
      })}
    </div>
  );
}
