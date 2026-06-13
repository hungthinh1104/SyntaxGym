import type { Snippet } from "../../types";

const BUILT_IN_CONTENT_DATE = "2026-06-13T00:00:00.000Z";

export const structSnippets: Snippet[] = [
  {
    id: "struct-basic",
    title: "1. Struct Basic",
    description: "Define a basic struct and instantiate it.",
    language: "rust",
    topic: "struct",
    dsaPattern: "none",
    difficulty: "easy",
    source: "built_in",
    tags: ["struct"],
    code: `struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username,
        email,
        sign_in_count: 1,
    }
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  },
  {
    id: "impl-methods",
    title: "2. Impl Methods",
    description: "Implement a method and an associated function for a struct.",
    language: "rust",
    topic: "impl",
    dsaPattern: "none",
    difficulty: "easy",
    source: "built_in",
    tags: ["impl", "method"],
    code: `struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn new(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  }
];
