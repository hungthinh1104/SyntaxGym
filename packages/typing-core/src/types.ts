export type TypingSessionStatus = "idle" | "running" | "finished" | "cancelled";

export type MistakeCategory =
  | "letter"
  | "number"
  | "whitespace"
  | "newline"
  | "brace"
  | "paren"
  | "bracket"
  | "angle_bracket"
  | "operator"
  | "punctuation"
  | "unknown";

export type TypingMistake = {
  id: string;
  index: number;
  expected: string;
  actual: string;
  category: MistakeCategory;
  timestamp: number;
};

export type TypingSession = {
  id: string;
  snippetId: string;
  source: string;
  typed: string;
  cursorIndex: number;
  startedAt: number | null;
  finishedAt: number | null;
  lastInputAt: number | null;
  mistakes: TypingMistake[];
  status: TypingSessionStatus;
};

export type TypingScore = {
  durationMs: number;
  typedCharacters: number;
  correctCharacters: number;
  incorrectCharacters: number;
  rawWpm: number;
  adjustedWpm: number;
  accuracy: number;
};
