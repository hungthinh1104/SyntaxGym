# SyntaxGym Architecture

SyntaxGym is a local-first code typing trainer for Rust syntax practice, DSA solution typing, custom snippets, token-aware mistake analytics, and session history.

The product goal is not generic typing speed. The goal is to train code-specific muscle memory: `::`, `=>`, `&self`, `&mut self`, `Option<T>`, `Result<T, E>`, `match`, `impl`, `HashMap`, iterators, and DSA pattern code.

## System Boundary

```txt
apps/web
  -> UI, pages, keyboard events, rendering

packages/typing-core
  -> pure typing session engine

packages/code-analysis
  -> Rust token analysis, DSA pattern analysis, weak-token reports

packages/content
  -> built-in Rust and DSA snippets

packages/storage
  -> localStorage persistence for custom snippets and session history

packages/shared
  -> shared utilities and base types

crates/syntaxgym-analyzer
  -> future Rust/WASM analyzer
```

## Core Flow

```txt
User presses key
  -> apps/web captures keyboard event
  -> typing-core applies input to TypingSession
  -> apps/web renders cursor and character state
  -> typing-core calculates score
  -> code-analysis builds weak-token report
  -> storage saves finished session locally
```

## Package Responsibilities

### apps/web

Owns user interaction and rendering.

Responsibilities:

```txt
- Render screens
- Capture keyboard input
- Display code characters
- Display cursor
- Display progress
- Display score
- Display weak-token reports
- Let user select snippets
- Let user paste custom snippets
```

Non-responsibilities:

```txt
- Do not calculate typing correctness directly
- Do not classify mistakes directly
- Do not hardcode built-in snippets
- Do not access localStorage directly
- Do not infer Rust/DSA tokens directly
```

apps/web should call package APIs instead of owning domain logic.

### packages/typing-core

Pure typing engine.

It must not know React, DOM, localStorage, snippets, Rust, DSA, or UI.

Responsibilities:

```txt
- Create typing sessions
- Apply character input
- Apply backspace
- Apply reset
- Track cursor position
- Track typed stream
- Track mistakes
- Finish session
- Calculate WPM
- Calculate accuracy
```

Core invariant:

```txt
TypingSession.source is immutable during a session.
TypingSession.cursorIndex points to the next expected character.
TypingSession.typed contains the accepted user input stream.
TypingSession.mistakes stores wrong inputs by source index.
```

Session state:

```txt
idle
  -> first valid input
running
  -> cursor reaches source length
finished
  -> result can be saved

idle/running/finished
  -> reset
idle
```

Finished sessions should not continue accepting input unless reset.

### packages/code-analysis

Code-aware analysis layer.

Responsibilities:

```txt
- Detect important Rust tokens
- Detect weak Rust tokens from mistake positions
- Infer simple DSA pattern from code
- Build token reports for result screen
```

Important Rust tokens:

```txt
::
=>
->
&self
&mut self
Option<
Result<
Some(
None
Ok(
Err(
match
impl
trait
enum
struct
Vec<
HashMap
.iter()
.enumerate()
.unwrap_or(
.map(
.and_then(
```

This package must not control typing state. It only analyzes `source` and `mistakes`.

### packages/content

Built-in content package.

Responsibilities:

```txt
- Rust syntax snippets
- DSA snippets
- Snippet metadata
- Lesson metadata
```

Snippet fields:

```txt
id
title
description
language
topic
dsaPattern
difficulty
source
externalUrl
tags
code
createdAt
updatedAt
```

Built-in snippets live here. User-created snippets do not. User-created snippets belong to storage.

### packages/storage

Local-first persistence layer.

Responsibilities:

```txt
- Save custom snippets
- Load custom snippets
- Remove custom snippets
- Save session history
- Load session history
- Clear session history
- Save settings later
```

Initial implementation uses `localStorage`.

The public API should stay repository-based:

```txt
SnippetRepository
SessionHistoryRepository
SettingsRepository later
```

Reason: IndexedDB or backend sync can be added later without rewriting UI code.

### packages/shared

Small shared utility package.

Responsibilities:

```txt
- createId
- nowMs
- nowIso
- clamp
- Result type
- assertNever
```

Rule: do not turn shared into a dumping ground. Only put code here if at least two packages need it.

### crates/syntaxgym-analyzer

Future Rust/WASM analyzer.

Current status: placeholder.

Future responsibilities:

```txt
- Rust token analysis
- Syntax-aware reports
- Optional parser-based analysis
- WASM export for apps/web
```

Rust should analyze code. Rust should not control browser UI.

## Dependency Rules

Allowed:

```txt
apps/web -> typing-core
apps/web -> code-analysis
apps/web -> content
apps/web -> storage
apps/web -> shared

typing-core -> shared

code-analysis -> typing-core
code-analysis -> shared

content -> shared

storage -> content
storage -> shared
```

Forbidden:

```txt
typing-core -> apps/web
code-analysis -> apps/web
content -> storage
shared -> typing-core
shared -> code-analysis
shared -> content
storage -> apps/web
```

The dependency graph must point inward toward pure packages, never outward toward UI.

## Typing Session Model

A typing session represents one practice attempt against one immutable source string.

```ts
type TypingSession = {
  id: string;
  snippetId: string;
  source: string;
  typed: string;
  cursorIndex: number;
  startedAt: number | null;
  finishedAt: number | null;
  lastInputAt: number | null;
  mistakes: TypingMistake[];
  status: "idle" | "running" | "finished" | "cancelled";
};
```

Rules:

```txt
source does not change during session
typed grows as accepted input is received
cursorIndex moves forward after accepted character input
mistakes are recorded when actual !== expected
startedAt is set on first character input
finishedAt is set when cursorIndex reaches source length
```

## Mistake Model

Each mistake is source-position based.

```ts
type TypingMistake = {
  id: string;
  index: number;
  expected: string;
  actual: string;
  category: MistakeCategory;
  timestamp: number;
};
```

Reason: token analysis needs to know where the error happened, not only how many errors happened.

Mistake categories:

```txt
letter
number
whitespace
newline
brace
paren
bracket
angle_bracket
operator
punctuation
unknown
```

## Scoring Model

Initial scoring:

```txt
rawWpm = typedCharacters / 5 / minutes
adjustedWpm = correctCharacters / 5 / minutes
accuracy = correctCharacters / typedCharacters
correctCharacters = typedCharacters - mistakeCount
```

WPM is not the core product metric.

Priority metrics:

```txt
1. Accuracy
2. Weak tokens
3. Repeated mistake positions
4. Improvement after retry
5. Adjusted WPM
```

## Storage Model

All user data is local by default.

Persisted:

```txt
custom snippets
session history
settings later
```

Not persisted initially:

```txt
raw keypress timeline
account data
cloud sync
LeetCode problem statements
official solutions
```

## DSA / LeetCode Rule

SyntaxGym must not scrape LeetCode.

Allowed:

```txt
User solves externally
  -> user pastes own accepted solution
  -> user adds optional external URL
  -> SyntaxGym stores code locally
  -> user practices typing/recall
```

Forbidden:

```txt
scrape problem statements
scrape official solutions
crawl submissions
mirror LeetCode database
use unofficial API for content import
```

DSA mode should train code patterns, not become a LeetCode clone.

## Practice Modes

Initial mode:

```txt
copy mode
  -> user types exact snippet
```

Future modes:

```txt
gap mode
  -> important tokens or lines are hidden

recall mode
  -> user sees only title/skeleton and rewrites solution
```

## Failure Modes to Avoid

### UI owns business logic

Bad:

```txt
Component calculates WPM, classifies mistakes, saves localStorage.
```

Good:

```txt
Component calls typing-core, code-analysis, and storage.
```

### Snippets hardcoded in UI

Bad:

```txt
PracticeScreen contains Rust code strings.
```

Good:

```txt
packages/content exports snippets.
```

### Typing engine depends on React

Bad:

```txt
typing-core imports useState or JSX.
```

Good:

```txt
typing-core exports pure functions.
```

### Weak-token report is cosmetic only

Bad:

```txt
Result screen shows only WPM and accuracy.
```

Good:

```txt
Result screen shows which Rust tokens block the user.
```

## Near-Term Product Loop

The app should support this loop:

```txt
Pick snippet
  -> type code
  -> see exact mistakes
  -> see weak Rust tokens
  -> retry same snippet
  -> save history
  -> add custom snippet
```

## Long-Term Extension Path

```txt
Rust syntax typing
  -> DSA typing
  -> custom snippets
  -> weak-token drills
  -> gap mode
  -> recall mode
  -> Rust/WASM analyzer
  -> optional Tauri desktop app
```

The architecture is correct if these features can be added without rewriting typing-core or replacing the storage boundary.