import type { Snippet } from "../../types";

const BUILT_IN_CONTENT_DATE = "2026-06-13T00:00:00.000Z";

export const optionResultSnippets: Snippet[] = [
  {
    id: "option-match",
    title: "11. Option Match",
    description: "Use match to extract a value from an Option.",
    language: "rust",
    topic: "option",
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

fn main() {
    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  },
  {
    id: "option-if-let",
    title: "12. Option if let",
    description: "Use if let for concise Option handling.",
    language: "rust",
    topic: "option",
    dsaPattern: "none",
    difficulty: "medium",
    source: "built_in",
    tags: ["option", "if-let"],
    code: `fn main() {
    let config_max = Some(3u8);

    match config_max {
        Some(max) => println!("The maximum is configured to be {}", max),
        _ => (),
    }

    // Concise version
    if let Some(max) = config_max {
        println!("The maximum is configured to be {}", max);
    }
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  },
  {
    id: "result-match",
    title: "13. Result Match",
    description: "Handle Ok and Err variants of a Result.",
    language: "rust",
    topic: "result",
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
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  },
  {
    id: "result-question-mark",
    title: "14. Result Question Mark",
    description: "Propagate errors early using the ? operator.",
    language: "rust",
    topic: "result",
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
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  },
  {
    id: "result-custom-error",
    title: "15. Result Custom Error",
    description: "Define a custom error enum and return it in a Result.",
    language: "rust",
    topic: "result",
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
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  }
];
