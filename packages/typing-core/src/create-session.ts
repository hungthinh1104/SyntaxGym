import { createId } from "@syntaxgym/shared";
import type { TypingSession } from "./types";

export function createTypingSession(input: {
  snippetId: string;
  source: string;
}): TypingSession {
  return {
    id: createId("session"),
    snippetId: input.snippetId,
    source: input.source.replace(/\r/g, ""),
    typed: "",
    cursorIndex: 0,
    startedAt: null,
    finishedAt: null,
    lastInputAt: null,
    mistakes: [],
    status: "idle"
  };
}
