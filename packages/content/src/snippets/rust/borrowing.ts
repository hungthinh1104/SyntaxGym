import type { Snippet } from "../../types";

const BUILT_IN_CONTENT_DATE = "2026-06-13T00:00:00.000Z";

export const borrowingSnippets: Snippet[] = [
  {
    id: "mutable-borrow",
    title: "6. Mutable Borrow",
    description: "Borrow a variable mutably to change its value.",
    language: "rust",
    topic: "borrowing",
    dsaPattern: "none",
    difficulty: "medium",
    source: "built_in",
    tags: ["borrow", "mut"],
    code: `fn main() {
    let mut s = String::from("hello");
    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  },
  {
    id: "immutable-borrow",
    title: "7. Immutable Borrow",
    description: "Pass references to a function without taking ownership.",
    language: "rust",
    topic: "borrowing",
    dsaPattern: "none",
    difficulty: "easy",
    source: "built_in",
    tags: ["borrow"],
    code: `fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  },
  {
    id: "lifetime-basic",
    title: "8. Lifetime Basic",
    description: "Use explicit lifetime annotations in a function signature.",
    language: "rust",
    topic: "lifetime",
    dsaPattern: "none",
    difficulty: "hard",
    source: "built_in",
    tags: ["lifetime"],
    code: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";
    let result = longest(string1.as_str(), string2);
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  }
];
