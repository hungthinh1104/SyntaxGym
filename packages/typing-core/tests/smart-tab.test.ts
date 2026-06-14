import { describe, expect, it } from "vitest";
import { getSmartTabKeystrokes } from "../src/smart-tab";

describe("getSmartTabKeystrokes", () => {
  it("consumes 2 spaces of indentation", () => {
    const source = "  let x;";
    const chars = getSmartTabKeystrokes(source, 0);
    expect(chars).toEqual([" ", " "]);
  });

  it("consumes remaining 1 space if indent is odd", () => {
    const source = "   let x;";
    // At index 2, there is 1 space left
    const chars = getSmartTabKeystrokes(source, 2);
    expect(chars).toEqual([" "]);
  });

  it("consumes real \\t", () => {
    const source = "\tlet x;";
    const chars = getSmartTabKeystrokes(source, 0);
    expect(chars).toEqual(["\t"]);
  });

  it("does not advance on non-indentation", () => {
    const source = "let x = 1;";
    // Cursor after 'let'
    const chars = getSmartTabKeystrokes(source, 3);
    expect(chars).toEqual([]); // Even though there is a space, it's not indentation
  });
});
