import type { Snippet } from "../../types";

const BUILT_IN_CONTENT_DATE = "2026-06-13T00:00:00.000Z";

export const collectionsSnippets: Snippet[] = [
  {
    id: "vec-macro-iteration",
    title: "9. Vec Macro & Iteration",
    description: "Create a vector using a macro and iterate over it mutably.",
    language: "rust",
    topic: "collection",
    dsaPattern: "none",
    difficulty: "easy",
    source: "built_in",
    tags: ["vec", "iter"],
    code: `fn process_numbers() {
    let mut v = vec![1, 2, 3, 4, 5];

    for i in &mut v {
        *i += 50;
    }

    for i in &v {
        println!("{}", i);
    }
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  },
  {
    id: "hashmap-basic",
    title: "10. HashMap Basic",
    description: "Initialize and insert values into a HashMap.",
    language: "rust",
    topic: "collection",
    dsaPattern: "none",
    difficulty: "easy",
    source: "built_in",
    tags: ["hashmap"],
    code: `use std::collections::HashMap;

fn store_scores() {
    let mut scores = HashMap::new();
    
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    let team_name = String::from("Blue");
    let score = scores.get(&team_name).copied().unwrap_or(0);
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  }
];
