import type { Snippet } from "../../types";

const BUILT_IN_CONTENT_DATE = "2026-06-13T00:00:00.000Z";

export const enumSnippets: Snippet[] = [
  {
    id: "enum-basic",
    title: "3. Enum Basic",
    description: "Define a simple enum with variants.",
    language: "rust",
    topic: "enum",
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

fn main() {
    let home = IpAddr {
        kind: IpAddrKind::V4,
        address: String::from("127.0.0.1"),
    };
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  },
  {
    id: "enum-associated-data",
    title: "4. Enum Associated Data",
    description: "Define an enum where variants contain data.",
    language: "rust",
    topic: "enum",
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

fn main() {
    let m = Message::Write(String::from("hello"));
    m.call();
}`,
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  },
  {
    id: "match-exhaustive",
    title: "5. Match Exhaustive",
    description: "Use a match expression to handle all enum variants.",
    language: "rust",
    topic: "match",
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
    createdAt: BUILT_IN_CONTENT_DATE,
    updatedAt: BUILT_IN_CONTENT_DATE,
  }
];
