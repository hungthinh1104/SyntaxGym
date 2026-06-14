import { describe, test, expect } from "vitest";
import { generateRetrySnippet } from "../src/retry-generator";
import type { WeakToken } from "../src/token-report";

describe("generateRetrySnippet", () => {
  test("returns null if no weak tokens", () => {
    expect(generateRetrySnippet([])).toBeNull();
  });

  test("generates snippet for =>", () => {
    const tokens: WeakToken[] = [
      { token: "=>", misses: 5, positions: [1, 2, 3, 4, 5] },
      { token: "Result<", misses: 2, positions: [10, 11] }
    ];
    
    const snippet = generateRetrySnippet(tokens, "test-id", "2024-01-01T00:00:00.000Z");
    
    expect(snippet).not.toBeNull();
    expect(snippet?.id).toBe("retry-test-id");
    expect(snippet?.title).toBe("Weak Token Retry: =>, Result<");
    expect(snippet?.tags).toContain("=>");
    expect(snippet?.code).toContain("=>");
    expect(snippet?.code).toContain("match");
  });

  test("generates snippet for Result<", () => {
    const tokens: WeakToken[] = [
      { token: "Result<", misses: 5, positions: [1, 2, 3, 4, 5] }
    ];
    
    const snippet = generateRetrySnippet(tokens, "test-id", "2024-01-01T00:00:00.000Z");
    
    expect(snippet?.title).toBe("Weak Token Retry: Result<");
    expect(snippet?.code).toContain("Result<i32, String>");
  });

  test("generates snippet for &mut", () => {
    const tokens: WeakToken[] = [
      { token: "&mut", misses: 3, positions: [1, 2, 3] }
    ];
    
    const snippet = generateRetrySnippet(tokens, "test-id", "2024-01-01T00:00:00.000Z");
    
    expect(snippet?.title).toBe("Weak Token Retry: &mut");
    expect(snippet?.code).toContain("&mut Vec<String>");
  });

  test("unknown token uses fallback drill", () => {
    const tokens: WeakToken[] = [
      { token: "unknown_token", misses: 1, positions: [1] }
    ];
    
    const snippet = generateRetrySnippet(tokens, "test-id", "2024-01-01T00:00:00.000Z");
    
    expect(snippet?.title).toBe("Weak Token Retry: unknown_token");
    expect(snippet?.code).toContain("fn generic_drill");
    expect(snippet?.code).toContain("=>");
  });
});
