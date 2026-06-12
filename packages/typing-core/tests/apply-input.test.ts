import { describe, expect, it } from "vitest";
import { applyInput, createTypingSession } from "../src";

describe("applyInput", () => {
  it("advances cursor on correct input", () => {
    let session = createTypingSession({ snippetId: "x", source: "abc" });
    session = applyInput(session, { kind: "character", value: "a", timestamp: 1 });
    expect(session.cursorIndex).toBe(1);
    expect(session.mistakes).toHaveLength(0);
  });

  it("records mistake on wrong input", () => {
    let session = createTypingSession({ snippetId: "x", source: "abc" });
    session = applyInput(session, { kind: "character", value: "z", timestamp: 1 });
    expect(session.cursorIndex).toBe(1);
    expect(session.mistakes).toHaveLength(1);
    expect(session.mistakes[0]?.expected).toBe("a");
  });
});
