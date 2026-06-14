import { describe, test, expect } from "vitest";
import { practicePacks } from "../src/practice-packs";
import { builtInSnippets } from "../src/index";

describe("practice packs", () => {
  test("all packs reference existing snippet IDs", () => {
    const validSnippetIds = new Set(builtInSnippets.map((s) => s.id));
    
    for (const pack of practicePacks) {
      for (const id of pack.snippetIds) {
        expect(validSnippetIds.has(id)).toBe(true);
      }
    }
  });

  test("no pack has duplicate snippet IDs", () => {
    for (const pack of practicePacks) {
      const idSet = new Set(pack.snippetIds);
      expect(idSet.size).toBe(pack.snippetIds.length);
    }
  });

  test("all packs have required metadata", () => {
    for (const pack of practicePacks) {
      expect(pack.id).toBeTruthy();
      expect(pack.title).toBeTruthy();
      expect(pack.description).toBeTruthy();
      expect(["beginner", "intermediate", "advanced"]).toContain(pack.level);
      expect(pack.focusTokens.length).toBeGreaterThan(0);
      expect(pack.snippetIds.length).toBeGreaterThan(0);
    }
  });
});
