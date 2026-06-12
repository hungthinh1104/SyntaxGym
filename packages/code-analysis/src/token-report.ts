import type { TypingMistake } from "@syntaxgym/typing-core";
import { rustImportantTokens } from "./rust-token-rules";

export type WeakToken = {
  token: string;
  misses: number;
  positions: number[];
};

export type TokenReport = {
  weakTokens: WeakToken[];
};

export function buildRustTokenReport(input: {
  source: string;
  mistakes: TypingMistake[];
}): TokenReport {
  const weakTokens: WeakToken[] = [];

  for (const token of rustImportantTokens) {
    const ranges = findTokenRanges(input.source, token);
    const positions: number[] = [];

    for (const mistake of input.mistakes) {
      const hit = ranges.some((range) => mistake.index >= range.start && mistake.index < range.end);
      if (hit) positions.push(mistake.index);
    }

    if (positions.length > 0) {
      weakTokens.push({
        token,
        misses: positions.length,
        positions
      });
    }
  }

  weakTokens.sort((a, b) => b.misses - a.misses || a.token.localeCompare(b.token));
  return { weakTokens };
}

function findTokenRanges(source: string, token: string): Array<{ start: number; end: number }> {
  const ranges: Array<{ start: number; end: number }> = [];
  let start = 0;

  while (true) {
    const index = source.indexOf(token, start);
    if (index === -1) break;

    ranges.push({ start: index, end: index + token.length });
    start = index + token.length;
  }

  return ranges;
}
