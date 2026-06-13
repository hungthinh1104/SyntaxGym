import { describe, expect, it } from "vitest";
import { applyInput, createTypingSession } from "../src";

describe("applyInput", () => {
  it("advances cursor on correct input", () => {
    let session = createTypingSession({ snippetId: "x", source: "abc" });
    session = applyInput(session, { kind: "character", value: "a", timestamp: 1 });
    expect(session.cursorIndex).toBe(1);
    expect(session.mistakes).toHaveLength(0);
  });

  it("wrong input records mistake", () => {
    let session = createTypingSession({ snippetId: "x", source: "abc" });
    session = applyInput(session, { kind: "character", value: "z", timestamp: 1 });
    expect(session.cursorIndex).toBe(1);
    expect(session.mistakes).toHaveLength(1);
    expect(session.mistakes[0]?.expected).toBe("a");
    expect(session.mistakes[0]?.actual).toBe("z");
  });

  it("backspace after wrong input removes corrected mistake", () => {
    let session = createTypingSession({ snippetId: "x", source: "abc" });
    session = applyInput(session, { kind: "character", value: "z", timestamp: 1 });
    expect(session.mistakes).toHaveLength(1);
    session = applyInput(session, { kind: "backspace", timestamp: 2 });
    expect(session.cursorIndex).toBe(0);
    expect(session.mistakes).toHaveLength(0);
  });

  it("reset clears typed, cursor, mistakes, timestamps, and status", () => {
    let session = createTypingSession({ snippetId: "x", source: "abc" });
    session = applyInput(session, { kind: "character", value: "a", timestamp: 1 });
    session = applyInput(session, { kind: "character", value: "z", timestamp: 2 });
    session = applyInput(session, { kind: "reset", timestamp: 3 });
    expect(session.typed).toBe("");
    expect(session.cursorIndex).toBe(0);
    expect(session.mistakes).toHaveLength(0);
    expect(session.startedAt).toBeNull();
    expect(session.finishedAt).toBeNull();
    expect(session.lastInputAt).toBeNull();
    expect(session.status).toBe("idle");
  });

  it("session becomes finished when cursor reaches source length", () => {
    let session = createTypingSession({ snippetId: "x", source: "ab" });
    session = applyInput(session, { kind: "character", value: "a", timestamp: 1 });
    expect(session.status).toBe("running");
    session = applyInput(session, { kind: "character", value: "b", timestamp: 2 });
    expect(session.status).toBe("finished");
    expect(session.cursorIndex).toBe(2);
    expect(session.finishedAt).toBe(2);
  });

  it("input after finished session is ignored", () => {
    let session = createTypingSession({ snippetId: "x", source: "a" });
    session = applyInput(session, { kind: "character", value: "a", timestamp: 1 });
    expect(session.status).toBe("finished");
    session = applyInput(session, { kind: "character", value: "b", timestamp: 2 });
    expect(session.cursorIndex).toBe(1);
    expect(session.typed).toBe("a");
    expect(session.mistakes).toHaveLength(0);
  });

  it("Enter input maps to newline", () => {
    let session = createTypingSession({ snippetId: "x", source: "\n" });
    session = applyInput(session, { kind: "character", value: "Enter", timestamp: 1 });
    expect(session.mistakes).toHaveLength(0);
    expect(session.typed).toBe("\n");
  });

  it("Tab input maps to tab", () => {
    let session = createTypingSession({ snippetId: "x", source: "\t" });
    session = applyInput(session, { kind: "character", value: "Tab", timestamp: 1 });
    expect(session.mistakes).toHaveLength(0);
    expect(session.typed).toBe("\t");
  });
});
