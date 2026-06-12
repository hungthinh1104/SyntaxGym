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
  });
});
