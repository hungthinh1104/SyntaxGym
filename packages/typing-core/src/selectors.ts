import type { TypingSession } from "./types";

export function getCurrentCharacter(session: TypingSession): string | null {
  return session.source[session.cursorIndex] ?? null;
}

export function getProgressPercent(session: TypingSession): number {
  if (session.source.length === 0) return 100;
  return Math.round((session.cursorIndex / session.source.length) * 100);
}

export function isFinished(session: TypingSession): boolean {
  return session.status === "finished";
}
