import type { TypingScore, TypingSession } from "./types";

const WORD_LENGTH = 5;

export function calculateScore(session: TypingSession, now = Date.now()): TypingScore {
  const startedAt = session.startedAt ?? now;
  const endedAt = session.finishedAt ?? session.lastInputAt ?? now;
  const durationMs = Math.max(0, endedAt - startedAt);
  const minutes = Math.max(durationMs / 60_000, 1 / 60_000);

  const typedCharacters = session.typed.length;
  const incorrectCharacters = session.mistakes.length;
  const correctCharacters = Math.max(0, typedCharacters - incorrectCharacters);

  const rawWpm = typedCharacters / WORD_LENGTH / minutes;
  const adjustedWpm = correctCharacters / WORD_LENGTH / minutes;
  const accuracy = typedCharacters === 0 ? 100 : (correctCharacters / typedCharacters) * 100;

  return {
    durationMs,
    typedCharacters,
    correctCharacters,
    incorrectCharacters,
    rawWpm: round(rawWpm),
    adjustedWpm: round(adjustedWpm),
    accuracy: round(accuracy)
  };
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
