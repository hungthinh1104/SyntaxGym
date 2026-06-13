import type { Snippet } from "../../types";

const BUILT_IN_CONTENT_DATE = "2026-06-13T00:00:00.000Z";

export const dsaSnippets: Snippet[] = [
  {
    id: "dsa-binary-search",
    title: "16. Binary Search",
    description: "Standard binary search implementation on a sorted slice.",
    language: "rust",
    topic: "dsa",
    dsaPattern: "binary_search",
    difficulty: "easy",
    source: "built_in",
    tags: ["binary-search", "array"],
    code: `pub fn search(nums: &[i32], target: i32) -> Option<usize> {
    let mut left = 0;
    let mut right = nums.len() as i32 - 1;

    while left <= right {
        let mid = left + (right - left) / 2;
        
        if nums[mid as usize] == target {
            return Some(mid as usize);
        } else if nums[mid as usize] < target {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    None
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  },
  {
    id: "dsa-two-pointers",
    title: "17. Two Pointers",
    description: "Reverse an array in-place using two pointers.",
    language: "rust",
    topic: "dsa",
    dsaPattern: "two_pointers",
    difficulty: "easy",
    source: "built_in",
    tags: ["two-pointers", "array"],
    code: `pub fn reverse_string(s: &mut Vec<char>) {
    if s.is_empty() {
        return;
    }
    
    let mut left = 0;
    let mut right = s.len() - 1;
    
    while left < right {
        s.swap(left, right);
        left += 1;
        right -= 1;
    }
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  },
  {
    id: "dsa-hashmap-frequency",
    title: "18. HashMap Frequency",
    description: "Count the frequency of elements using a HashMap.",
    language: "rust",
    topic: "dsa",
    dsaPattern: "hashmap",
    difficulty: "easy",
    source: "built_in",
    tags: ["hashmap", "frequency"],
    code: `use std::collections::HashMap;

pub fn count_frequencies(nums: &[i32]) -> HashMap<i32, i32> {
    let mut counts = HashMap::new();
    
    for &num in nums {
        *counts.entry(num).or_insert(0) += 1;
    }
    
    counts
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  },
  {
    id: "dsa-bfs-queue",
    title: "19. BFS Queue",
    description: "Breadth-first search traversal using VecDeque.",
    language: "rust",
    topic: "dsa",
    dsaPattern: "graph_bfs",
    difficulty: "medium",
    source: "built_in",
    tags: ["bfs", "queue"],
    code: `use std::collections::{VecDeque, HashSet};

pub fn bfs(graph: &[Vec<usize>], start: usize) {
    let mut queue = VecDeque::new();
    let mut visited = HashSet::new();
    
    queue.push_back(start);
    visited.insert(start);
    
    while let Some(node) = queue.pop_front() {
        println!("Visiting {}", node);
        
        for &neighbor in &graph[node] {
            if visited.insert(neighbor) {
                queue.push_back(neighbor);
            }
        }
    }
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  },
  {
    id: "dsa-dfs-recursive",
    title: "20. DFS Recursive",
    description: "Depth-first search traversal using recursion.",
    language: "rust",
    topic: "dsa",
    dsaPattern: "tree_dfs",
    difficulty: "medium",
    source: "built_in",
    tags: ["dfs", "recursion"],
    code: `use std::collections::HashSet;

pub fn dfs(graph: &[Vec<usize>], node: usize, visited: &mut HashSet<usize>) {
    if !visited.insert(node) {
        return;
    }
    
    println!("Visiting {}", node);
    
    for &neighbor in &graph[node] {
        dfs(graph, neighbor, visited);
    }
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  }
];
