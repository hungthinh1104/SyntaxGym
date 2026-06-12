export const rustImportantTokens = [
  "::",
  "=>",
  "->",
  "&self",
  "&mut self",
  "Option<",
  "Result<",
  "Some(",
  "None",
  "Ok(",
  "Err(",
  "match",
  "impl",
  "trait",
  "enum",
  "struct",
  "Vec<",
  "HashMap",
  ".iter()",
  ".enumerate()",
  ".unwrap_or(",
  ".map(",
  ".and_then("
] as const;

export type RustImportantToken = (typeof rustImportantTokens)[number];
