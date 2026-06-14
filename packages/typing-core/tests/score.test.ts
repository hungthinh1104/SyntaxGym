import { describe, expect, it } from "vitest";
import { calculateScore, createTypingSession, applyInput } from "../src";

describe("calculateScore", () => {
  it("accuracy does not collapse to 0 from repeated same-index mistakes", () => {
    let session = createTypingSession({ snippetId: "x", source: "let" });
    
    // Type l correctly
    session = applyInput(session, { kind: "character", value: "l", timestamp: 1 });
    
    // Make 10 mistakes at the same index
    for (let i = 0; i < 10; i++) {
      session = applyInput(session, { kind: "character", value: "z", timestamp: 10 + i });
    }
    
    // Type e correctly
    session = applyInput(session, { kind: "character", value: "e", timestamp: 20 });
    // Type t correctly
    session = applyInput(session, { kind: "character", value: "t", timestamp: 21 });

    const score = calculateScore(session, 30);
    
    // Total typed characters = 3
    // Total raw mistakes = 10
    // Unique mistakes = 1 (at index 1)
    // Correct characters = Math.max(0, 3 - 1) = 2
    // Accuracy = (2 / 3) * 100 = 66.67%
    // It should not be 0% or negative!
    expect(score.typedCharacters).toBe(3);
    expect(score.incorrectCharacters).toBe(1);
    expect(score.accuracy).toBe(66.67);
  });
});
