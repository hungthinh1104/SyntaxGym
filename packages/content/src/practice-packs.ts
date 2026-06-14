import type { PracticePack } from "./types";

export const practicePacks: PracticePack[] = [
  {
    id: "rust-basics",
    title: "Rust Basics",
    description: "Master the fundamentals: defining structs, implementing methods, and basic enums.",
    level: "beginner",
    focusTokens: ["struct", "impl", "enum", "fn"],
    snippetIds: [
      "struct-basic",
      "impl-methods",
      "enum-basic"
    ]
  },
  {
    id: "option-result",
    title: "Option / Result",
    description: "Learn safe error handling and null-safety without exceptions.",
    level: "intermediate",
    focusTokens: ["Option<", "Result<", "Some(", "None", "Ok(", "Err(", "match", "=>"],
    snippetIds: [
      "option-match",
      "option-if-let",
      "result-match",
      "result-question-mark",
      "result-custom-error"
    ]
  },
  {
    id: "enum-match",
    title: "Enum / Match",
    description: "Leverage powerful algebraic data types and exhaustive pattern matching.",
    level: "beginner",
    focusTokens: ["enum", "match", "=>", "Some(", "None", "_"],
    snippetIds: [
      "enum-basic",
      "enum-associated-data",
      "match-exhaustive"
    ]
  },
  {
    id: "borrowing",
    title: "Borrowing",
    description: "Understand ownership, references, mutable borrows, and basic lifetimes.",
    level: "intermediate",
    focusTokens: ["&self", "&mut", "&"],
    snippetIds: [
      "mutable-borrow",
      "immutable-borrow",
      "lifetime-basic"
    ]
  },
  {
    id: "collections",
    title: "Collections",
    description: "Practice using standard library vectors and hashmaps.",
    level: "beginner",
    focusTokens: ["Vec<", "vec![", "HashMap", ".iter()", "for", "in"],
    snippetIds: [
      "vec-macro-iteration",
      "hashmap-basic"
    ]
  },
  {
    id: "dsa-rust",
    title: "DSA Rust",
    description: "Apply Rust syntax to classic Data Structures and Algorithms.",
    level: "advanced",
    focusTokens: ["while", "let mut", "swap", "Option<", "HashSet", "VecDeque"],
    snippetIds: [
      "dsa-binary-search",
      "dsa-two-pointers",
      "dsa-hashmap-frequency",
      "dsa-bfs-queue",
      "dsa-dfs-recursive"
    ]
  }
];
