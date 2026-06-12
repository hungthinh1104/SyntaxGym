import type { MistakeCategory } from "./types";

const operators = new Set(["=", "+", "-", "*", "/", "%", "!", "<", ">", "&", "|", "?", ":", "."]);
const braces = new Set(["{", "}"]);
const parens = new Set(["(", ")"]);
const brackets = new Set(["[", "]"]);

export function classifyMistake(expected: string): MistakeCategory {
  if (expected === "\n") return "newline";
  if (expected === " " || expected === "\t") return "whitespace";
  if (/^[a-zA-Z_]$/.test(expected)) return "letter";
  if (/^[0-9]$/.test(expected)) return "number";
  if (braces.has(expected)) return "brace";
  if (parens.has(expected)) return "paren";
  if (brackets.has(expected)) return "bracket";
  if (expected === "<" || expected === ">") return "angle_bracket";
  if (operators.has(expected)) return "operator";
  if (/^[,;'"]$/.test(expected)) return "punctuation";
  return "unknown";
}
