import { useEffect, useMemo, useRef, useState, memo, forwardRef } from "react";
import type { TypingSession } from "@syntaxgym/typing-core";
import { getSmartTabKeystrokes } from "@syntaxgym/typing-core";
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

type CharProps = {
  char: string;
  isCurrent: boolean;
  isMistake: boolean;
  isTyped: boolean;
  syntaxClass: string;
};

const Char = memo(forwardRef<HTMLSpanElement, CharProps>(({ char, isCurrent, isMistake, isTyped, syntaxClass }, ref) => {
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
      <span ref={ref} className={charClass}>
        {isMistake && "↵"}{"\n"}
      </span>
    );
  }

  if (char === " ") {
    return (
      <span ref={ref} className={charClass}>
        {isMistake ? "·" : " "}
      </span>
    );
  }

  if (char === "\t") {
    return (
      <span ref={ref} className={charClass}>
        {isMistake ? "⇥" : "  "}
      </span>
    );
  }

  return (
    <span ref={ref} className={charClass}>
      {char}
    </span>
  );
}));

export function CodeTypingArea({ session, onCharacter, onBackspace }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeCursorRef = useRef<HTMLSpanElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const syntaxColors = useMemo(() => buildSyntaxColors(session.source), [session.source]);
  const sourceChars = useMemo(() => Array.from(session.source), [session.source]);

  useEffect(() => {
    containerRef.current?.focus();
  }, [session.id]);

  useEffect(() => {
    if (!activeCursorRef.current || !containerRef.current) return;
    
    const rafId = requestAnimationFrame(() => {
      if (!activeCursorRef.current || !containerRef.current) return;
      
      const cursorRect = activeCursorRef.current.getBoundingClientRect();
      
      if (
        cursorRect.bottom > window.innerHeight - 100 ||
        cursorRect.top < 100
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
      const chars = getSmartTabKeystrokes(session.source, session.cursorIndex);
      chars.forEach((c) => onCharacter(c));
      return;
    }

    if (event.key.length === 1) {
      event.preventDefault();
      onCharacter(event.key);
    }
  }

  return (
    <div className="relative w-full">
      <span id="typing-instruction" className="sr-only">Type the code below. The editor is ready.</span>
      <div
        ref={containerRef}
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={"w-full min-h-[420px] lg:min-h-[640px] whitespace-pre-wrap outline-none focus:ring-1 focus:ring-sst-ink/20 focus:border-sst-ink/30 transition-all " +
                   "rounded-lg border border-lavender-mist bg-white p-20 lg:p-32 font-ibm-plex-mono text-[16px] lg:text-[20px] leading-[1.7] text-sst-ink"}
        onKeyDown={handleKeyDown}
        aria-label="Code typing area"
        aria-describedby="typing-instruction"
      >
      {sourceChars.map((char, index) => {
        const typedChar = session.typed[index];
        const isTyped = typedChar !== undefined;
        const isCurrent = index === session.cursorIndex;
        const isMistake = isTyped && typedChar !== session.source[index];
        const syntaxClass = syntaxColors[index] || "text-sst-ink";
        
        return (
          <Char
            key={index}
            ref={isCurrent ? activeCursorRef : undefined}
            char={char}
            isCurrent={isCurrent}
            isMistake={isMistake}
            isTyped={isTyped}
            syntaxClass={syntaxClass}
          />
        );
      })}
      </div>

      {!isFocused && session.status !== "finished" && (
        <div 
          className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[2px] cursor-pointer rounded-lg transition-all"
          onClick={() => containerRef.current?.focus()}
          aria-hidden="true"
        >
          <span className={ui.eyebrow + " flex items-center gap-12 bg-white px-24 py-12 rounded-full border border-lavender-mist shadow-md text-sst-ink text-[14px]"}>
            <span className="w-10 h-10 rounded-full bg-sst-ink animate-pulse" />
            Click to focus and start typing
          </span>
        </div>
      )}
    </div>
  );
}
