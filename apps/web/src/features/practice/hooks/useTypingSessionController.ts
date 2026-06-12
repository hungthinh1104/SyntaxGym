import { useEffect, useMemo, useState } from "react";
import type { Snippet } from "@syntaxgym/content";
import {
  applyInput,
  createTypingSession,
  type TypingSession
} from "@syntaxgym/typing-core";

export function useTypingSessionController(snippet: Snippet) {
  const initialSession = useMemo(
    () => createTypingSession({ snippetId: snippet.id, source: snippet.code }),
    [snippet.id, snippet.code]
  );

  const [session, setSession] = useState<TypingSession>(initialSession);

  useEffect(() => {
    setSession(initialSession);
  }, [initialSession]);

  function typeCharacter(value: string) {
    setSession((current) =>
      applyInput(current, {
        kind: "character",
        value,
        timestamp: Date.now()
      })
    );
  }

  function backspace() {
    setSession((current) =>
      applyInput(current, {
        kind: "backspace",
        timestamp: Date.now()
      })
    );
  }

  function reset() {
    setSession((current) =>
      applyInput(current, {
        kind: "reset",
        timestamp: Date.now()
      })
    );
  }

  return {
    session,
    typeCharacter,
    backspace,
    reset
  };
}
