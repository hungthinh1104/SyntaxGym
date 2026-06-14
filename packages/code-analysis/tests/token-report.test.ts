import { describe, expect, it } from "vitest";
import { buildRustTokenReport } from "../src";

describe("buildRustTokenReport", () => {
  it("reports mistake inside important Rust token", () => {
    const source = "match coin {\n    Coin::Penny => 1,\n}";
    const report = buildRustTokenReport({
      source,
      mistakes: [
        {
          id: "m1",
          index: source.indexOf("=>"),
          expected: "=",
          actual: "-",
          category: "operator",
          timestamp: 1
        }
      ]
    });

    expect(report.weakTokens[0]?.token).toBe("=>");
    expect(report.weakTokens[0]?.misses).toBe(1);
  });

  it("deduplicates multiple mistakes at the same index so a token instance counts as 1 miss", () => {
    const source = "match coin {\n    Coin::Penny => 1,\n}";
    const index = source.indexOf("=>");
    const report = buildRustTokenReport({
      source,
      mistakes: [
        { id: "m1", index, expected: "=", actual: "-", category: "operator", timestamp: 1 },
        { id: "m2", index, expected: "=", actual: "x", category: "letter", timestamp: 2 },
        { id: "m3", index, expected: "=", actual: "y", category: "letter", timestamp: 3 },
      ]
    });

    expect(report.weakTokens[0]?.token).toBe("=>");
    expect(report.weakTokens[0]?.misses).toBe(1); // Only 1 miss because it's the same index
  });
});
