import { useEffect, useMemo, useRef } from "react";
import type { TypingSession } from "@syntaxgym/typing-core";

type Props = {
  session: TypingSession;
  onCharacter: (value: string) => void;
  onBackspace: () => void;
};

export function CodeTypingArea({ session, onCharacter, onBackspace }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const mistakeIndexSet = useMemo(() => {
    return new Set(session.mistakes.map((mistake) => mistake.index));
  }, [session.mistakes]);

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
      className="typing-area"
      onKeyDown={handleKeyDown}
      aria-label="Code typing area"
    >
      {Array.from(session.source).map((char, index) => {
        const typedChar = session.typed[index];
        const isTyped = typedChar !== undefined;
        const isCurrent = index === session.cursorIndex;
        const isMistake = mistakeIndexSet.has(index);
        const className = [
          "code-char",
          isTyped && !isMistake ? "correct" : "",
          isMistake ? "incorrect" : "",
          isCurrent ? "current" : "",
          char === "\n" ? "newline" : ""
        ]
          .filter(Boolean)
          .join(" ");

        if (char === "\n") {
          return (
            <span key={index} className={className}>
              {"↵\n"}
            </span>
          );
        }

        if (char === " ") {
          return (
            <span key={index} className={className}>
              {"·"}
            </span>
          );
        }

        if (char === "\t") {
          return (
            <span key={index} className={className}>
              {"⇥"}
            </span>
          );
        }

        return (
          <span key={index} className={className}>
            {char}
          </span>
        );
      })}
    </div>
  );
}
