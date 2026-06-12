import type { Snippet } from "./types";

const now = new Date().toISOString();

export const rustSnippets: Snippet[] = [
  {
    id: "struct-basic",
    title: "1. Struct Basic",
    description: "Define a basic struct and instantiate it.",
    language: "rust",
    topic: "rust-syntax",
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
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "impl-methods",
    title: "2. Impl Methods",
    description: "Implement a method and an associated function for a struct.",
    language: "rust",
    topic: "rust-syntax",
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
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "enum-basic",
    title: "3. Enum Basic",
    description: "Define a simple enum with variants.",
    language: "rust",
    topic: "rust-syntax",
    dsaPattern: "none",
    difficulty: "easy",
    source: "built_in",
    tags: ["enum"],
    code: `enum IpAddrKind {
    V4,
    V6,
}

struct IpAddr {
    kind: IpAddrKind,
    address: String,
}

let home = IpAddr {
    kind: IpAddrKind::V4,
    address: String::from("127.0.0.1"),
};`,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "enum-associated-data",
    title: "4. Enum Associated Data",
    description: "Define an enum where variants contain data.",
    language: "rust",
    topic: "rust-syntax",
    dsaPattern: "none",
    difficulty: "medium",
    source: "built_in",
    tags: ["enum", "data"],
    code: `enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

impl Message {
    fn call(&self) {
        // method body
    }
}

let m = Message::Write(String::from("hello"));
m.call();`,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "match-exhaustive",
    title: "5. Match Exhaustive",
    description: "Use a match expression to handle all enum variants.",
    language: "rust",
    topic: "rust-syntax",
    dsaPattern: "none",
    difficulty: "medium",
    source: "built_in",
    tags: ["match", "enum"],
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
}`,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "mutable-borrow",
    title: "6. Mutable Borrow",
    description: "Borrow a variable mutably to change its value.",
    language: "rust",
    topic: "rust-syntax",
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
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "immutable-borrow",
    title: "7. Immutable Borrow",
    description: "Pass references to a function without taking ownership.",
    language: "rust",
    topic: "rust-syntax",
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
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "lifetime-basic",
    title: "8. Lifetime Basic",
    description: "Use explicit lifetime annotations in a function signature.",
    language: "rust",
    topic: "rust-syntax",
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

let string1 = String::from("abcd");
let string2 = "xyz";
let result = longest(string1.as_str(), string2);`,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "vec-macro-iteration",
    title: "9. Vec Macro & Iteration",
    description: "Create a vector using a macro and iterate over it mutably.",
    language: "rust",
    topic: "rust-syntax",
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
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "hashmap-basic",
    title: "10. HashMap Basic",
    description: "Initialize and insert values into a HashMap.",
    language: "rust",
    topic: "rust-syntax",
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
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "option-match",
    title: "11. Option Match",
    description: "Use match to extract a value from an Option.",
    language: "rust",
    topic: "rust-syntax",
    dsaPattern: "none",
    difficulty: "medium",
    source: "built_in",
    tags: ["option", "match"],
    code: `fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

let five = Some(5);
let six = plus_one(five);
let none = plus_one(None);`,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "option-if-let",
    title: "12. Option if let",
    description: "Use if let for concise Option handling.",
    language: "rust",
    topic: "rust-syntax",
    dsaPattern: "none",
    difficulty: "medium",
    source: "built_in",
    tags: ["option", "if-let"],
    code: `let config_max = Some(3u8);

match config_max {
    Some(max) => println!("The maximum is configured to be {}", max),
    _ => (),
}

// Concise version
if let Some(max) = config_max {
    println!("The maximum is configured to be {}", max);
}`,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "result-match",
    title: "13. Result Match",
    description: "Handle Ok and Err variants of a Result.",
    language: "rust",
    topic: "rust-syntax",
    dsaPattern: "none",
    difficulty: "medium",
    source: "built_in",
    tags: ["result", "match"],
    code: `use std::fs::File;
use std::io::ErrorKind;

fn open_file() {
    let greeting_file_result = File::open("hello.txt");

    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => panic!("File not found"),
            other_error => panic!("Problem opening the file: {:?}", other_error),
        },
    };
}`,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "result-question-mark",
    title: "14. Result Question Mark",
    description: "Propagate errors early using the ? operator.",
    language: "rust",
    topic: "rust-syntax",
    dsaPattern: "none",
    difficulty: "medium",
    source: "built_in",
    tags: ["result", "error-handling"],
    code: `use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username = String::new();
    File::open("hello.txt")?.read_to_string(&mut username)?;
    Ok(username)
}`,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "result-custom-error",
    title: "15. Result Custom Error",
    description: "Define a custom error enum and return it in a Result.",
    language: "rust",
    topic: "rust-syntax",
    dsaPattern: "none",
    difficulty: "hard",
    source: "built_in",
    tags: ["result", "custom-error"],
    code: `#[derive(Debug)]
enum MyError {
    InvalidInput,
    NetworkFailure,
}

fn do_work(val: i32) -> Result<i32, MyError> {
    if val < 0 {
        return Err(MyError::InvalidInput);
    }
    if val == 0 {
        return Err(MyError::NetworkFailure);
    }
    Ok(val * 2)
}

fn main() -> Result<(), MyError> {
    let res = do_work(5)?;
    println!("{}", res);
    Ok(())
}`,
    createdAt: now,
    updatedAt: now,
  }
];
