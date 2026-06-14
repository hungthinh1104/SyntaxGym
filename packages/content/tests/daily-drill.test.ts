import { describe, test, expect } from "vitest";
import { getDailyDrillSnippet } from "../src/daily-drill";

describe("daily drill", () => {
  test("deterministic selection", () => {
    const drill1 = getDailyDrillSnippet("2024-05-10");
    const drill2 = getDailyDrillSnippet("2024-05-10");
    expect(drill1).toBe(drill2);
    expect(drill1).not.toBeNull();
  });

  test("different dates may yield different snippets", () => {
    const drill1 = getDailyDrillSnippet("2024-05-10");
    let foundDifferent = false;
    
    for (let i = 1; i <= 30; i++) {
      const drill2 = getDailyDrillSnippet(`2024-05-${i.toString().padStart(2, "0")}`);
      if (drill1?.id !== drill2?.id) {
        foundDifferent = true;
        break;
      }
    }
    
    expect(foundDifferent).toBe(true);
  });
});
