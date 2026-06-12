export * from "./types";
export * from "./rust-snippets";
export * from "./dsa-snippets";

import { rustSnippets } from "./rust-snippets";
import { dsaSnippets } from "./dsa-snippets";

export const builtInSnippets = [...rustSnippets, ...dsaSnippets];
