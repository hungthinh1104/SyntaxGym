import { createId } from "@syntaxgym/shared";
import { classifyMistake } from "./classify-mistake";
import type { TypingMistake, TypingSession } from "./types";

export type ApplyInputCommand =
  | { kind: "character"; value: string; timestamp: number }
  | { kind: "backspace"; timestamp: number }
  | { kind: "reset"; timestamp: number };

export function applyInput(session: TypingSession, command: ApplyInputCommand): TypingSession {
  if (command.kind === "reset") {
    return {
      ...session,
      typed: "",
      cursorIndex: 0,
      startedAt: null,
      finishedAt: null,
      lastInputAt: null,
      mistakes: [],
      status: "idle"
    };
  }

  if (session.status === "finished" || session.status === "cancelled") {
    return session;
  }

  if (command.kind === "backspace") {
    if (session.typed.length > session.cursorIndex) {
      return {
        ...session,
        typed: session.typed.slice(0, session.cursorIndex),
        lastInputAt: command.timestamp,
        status: session.startedAt === null ? "idle" : "running"
      };
    }

    if (session.cursorIndex === 0) return session;

    const correctedIndex = session.cursorIndex - 1;

    return {
      ...session,
      typed: session.typed.slice(0, correctedIndex),
      cursorIndex: correctedIndex,
      lastInputAt: command.timestamp,
      status: session.startedAt === null ? "idle" : "running"
    };
  }

  const expected = session.source[session.cursorIndex];
  if (expected === undefined) {
    return finishSession(session, command.timestamp);
  }

  const actual = normalizeInput(command.value);
  const isCorrect = actual === expected;

  const mistake: TypingMistake | null = isCorrect
    ? null
    : {
        id: createId("mistake"),
        index: session.cursorIndex,
        expected,
        actual,
        category: classifyMistake(expected),
        timestamp: command.timestamp
      };

  const nextTyped = session.typed.slice(0, session.cursorIndex) + actual;
  const nextCursor = isCorrect ? session.cursorIndex + 1 : session.cursorIndex;
  const isFinished = nextCursor >= session.source.length;

  return {
    ...session,
    typed: nextTyped,
    cursorIndex: nextCursor,
    startedAt: session.startedAt ?? command.timestamp,
    lastInputAt: command.timestamp,
    finishedAt: isFinished ? command.timestamp : null,
    mistakes: mistake ? [...session.mistakes, mistake] : session.mistakes,
    status: isFinished ? "finished" : "running"
  };
}

export function finishSession(session: TypingSession, timestamp: number): TypingSession {
  return {
    ...session,
    finishedAt: session.finishedAt ?? timestamp,
    lastInputAt: timestamp,
    status: "finished"
  };
}

function normalizeInput(value: string): string {
  if (value === "Enter") return "\n";
  if (value === "Tab") return "\t";
  return value;
}
