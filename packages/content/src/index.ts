export * from "./types";

import { structSnippets } from "./snippets/rust/structs";
import { enumSnippets } from "./snippets/rust/enums";
import { borrowingSnippets } from "./snippets/rust/borrowing";
import { collectionsSnippets } from "./snippets/rust/collections";
import { optionResultSnippets } from "./snippets/rust/option-result";
import { dsaSnippets } from "./snippets/dsa/dsa";

export const builtInSnippets = [
  ...structSnippets,
  ...enumSnippets,
  ...borrowingSnippets,
  ...collectionsSnippets,
  ...optionResultSnippets,
  ...dsaSnippets,
];
