export type CodeLanguage = "rust" | "typescript" | "javascript" | "python" | "cpp";

export type SnippetDifficulty = "easy" | "medium" | "hard";

export type SnippetSource = "built_in" | "manual_paste" | "local_file";

export type DsaPattern =
  | "none"
  | "hashmap"
  | "two_pointers"
  | "sliding_window"
  | "binary_search"
  | "stack"
  | "tree_dfs"
  | "graph_bfs"
  | "dynamic_programming";

export type Snippet = {
  id: string;
  title: string;
  description: string;
  language: CodeLanguage;
  topic: string;
  dsaPattern: DsaPattern;
  difficulty: SnippetDifficulty;
  source: SnippetSource;
  externalUrl?: string;
  tags: string[];
  code: string;
  createdAt: string;
  updatedAt: string;
};
