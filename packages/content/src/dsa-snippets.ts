import type { Snippet } from "./types";

const now = "2026-06-13T00:00:00.000Z";

export const dsaSnippets: Snippet[] = [
  {
    id: "rust-two-sum-hashmap",
    title: "Two Sum - HashMap",
    description: "HashMap complement lookup pattern.",
    language: "rust",
    topic: "dsa",
    dsaPattern: "hashmap",
    difficulty: "easy",
    source: "built_in",
    tags: ["rust", "dsa", "hashmap"],
    createdAt: now,
    updatedAt: now,
    code: `use std::collections::HashMap;

fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut seen: HashMap<i32, usize> = HashMap::new();

    for (i, &num) in nums.iter().enumerate() {
        let need = target - num;

        if let Some(&j) = seen.get(&need) {
            return vec![j as i32, i as i32];
        }

        seen.insert(num, i);
    }

    vec![]
}

fn main() {
    let result = two_sum(vec![2, 7, 11, 15], 9);
    println!("{:?}", result);
}`
  },
  {
    id: "rust-valid-palindrome-two-pointers",
    title: "Valid Palindrome - Two Pointers",
    description: "Classic left/right pointer movement.",
    language: "rust",
    topic: "dsa",
    dsaPattern: "two_pointers",
    difficulty: "easy",
    source: "built_in",
    tags: ["rust", "dsa", "two-pointers"],
    createdAt: now,
    updatedAt: now,
    code: `fn is_palindrome(chars: Vec<char>) -> bool {
    if chars.is_empty() {
        return true;
    }

    let mut left = 0usize;
    let mut right = chars.len() - 1;

    while left < right {
        if chars[left] != chars[right] {
            return false;
        }

        left += 1;
        right -= 1;
    }

    true
}

fn main() {
    println!("{}", is_palindrome(vec!['r', 'a', 'c', 'e', 'c', 'a', 'r']));
}`
  }
];
