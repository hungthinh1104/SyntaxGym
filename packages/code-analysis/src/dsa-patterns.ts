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

export function inferDsaPattern(source: string): DsaPattern {
  if (source.includes("HashMap") || source.includes(".insert(") || source.includes(".get(")) {
    return "hashmap";
  }

  if (source.includes("left") && source.includes("right") && source.includes("while left < right")) {
    return "two_pointers";
  }

  if (source.includes("window") || (source.includes("left") && source.includes("right") && source.includes("for"))) {
    return "sliding_window";
  }

  if (source.includes("mid") && source.includes("left") && source.includes("right")) {
    return "binary_search";
  }

  if (source.includes("stack")) {
    return "stack";
  }

  return "none";
}
