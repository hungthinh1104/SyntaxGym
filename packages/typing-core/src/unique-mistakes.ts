import type { TypingMistake } from "./types";

export function getUniqueMistakes(mistakes: TypingMistake[]): TypingMistake[] {
  const seen = new Set<number>();
  const unique: TypingMistake[] = [];
  for (const m of mistakes) {
    if (!seen.has(m.index)) {
      seen.add(m.index);
      unique.push(m);
    }
  }
  return unique;
}
