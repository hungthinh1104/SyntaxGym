import type { Snippet } from "./types";

const now = "2026-06-13T00:00:00.000Z";

export const rustSnippets: Snippet[] = [
  {
    id: "rust-enum-coin-match",
    title: "Enum Coin + match",
    description: "Basic enum variants and exhaustive match.",
    language: "rust",
    topic: "enum",
    dsaPattern: "none",
    difficulty: "easy",
    source: "built_in",
    tags: ["rust", "enum", "match"],
    createdAt: now,
    updatedAt: now,
    code: `enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}

fn main() {
    let coin = Coin::Quarter;
    let value = value_in_cents(coin);

    println!("Value: {}", value);
}`
  },
  {
    id: "rust-option-user-lookup",
    title: "Option<T> user lookup",
    description: "Practice Some, None, match, and ownership of String.",
    language: "rust",
    topic: "option",
    dsaPattern: "none",
    difficulty: "easy",
    source: "built_in",
    tags: ["rust", "option", "match"],
    createdAt: now,
    updatedAt: now,
    code: `struct User {
    id: u32,
    name: String,
}

fn find_user(id: u32) -> Option<User> {
    if id == 1 {
        Some(User {
            id: 1,
            name: String::from("Ke"),
        })
    } else {
        None
    }
}

fn main() {
    let result = find_user(1);

    match result {
        Some(user) => println!("Found: {}", user.name),
        None => println!("User not found"),
    }
}`
  },
  {
    id: "rust-borrowing-print",
    title: "Borrowing with &self-style function",
    description: "Practice references without moving the value.",
    language: "rust",
    topic: "borrowing",
    dsaPattern: "none",
    difficulty: "medium",
    source: "built_in",
    tags: ["rust", "reference", "borrow"],
    createdAt: now,
    updatedAt: now,
    code: `#[derive(Debug)]
struct Order {
    id: u32,
    amount: u32,
}

fn print_order(order: &Order) {
    println!("Order: {:?}", order);
}

fn main() {
    let order = Order {
        id: 1,
        amount: 500_000,
    };

    print_order(&order);
    println!("Can still use order id: {}", order.id);
}`
  }
];
