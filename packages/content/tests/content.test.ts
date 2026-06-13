import { describe, expect, it } from "vitest";
import { builtInSnippets } from "../src/index";

describe("builtInSnippets", () => {
  it("contains exactly 20 snippets", () => {
    expect(builtInSnippets).toHaveLength(20);
  });

  it("has unique ids for all snippets", () => {
    const ids = builtInSnippets.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("has non-empty title and code after trimming", () => {
    for (const snippet of builtInSnippets) {
      expect(snippet.title.trim().length).toBeGreaterThan(0);
      expect(snippet.code.trim().length).toBeGreaterThan(0);
    }
  });

  it("has deterministic createdAt and updatedAt dates", () => {
    const expectedDate = "2026-06-13T00:00:00.000Z";
    for (const snippet of builtInSnippets) {
      expect(snippet.createdAt).toBe(expectedDate);
      expect(snippet.updatedAt).toBe(expectedDate);
    }
  });

  it("all built-in snippets have language 'rust'", () => {
    for (const snippet of builtInSnippets) {
      expect(snippet.language).toBe("rust");
    }
  });

  it("all dsa- prefixed snippets have topic 'dsa'", () => {
    for (const snippet of builtInSnippets) {
      if (snippet.id.startsWith("dsa-")) {
        expect(snippet.topic).toBe("dsa");
      }
    }
  });
});
