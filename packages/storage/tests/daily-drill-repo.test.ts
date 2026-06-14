import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { createLocalDailyDrillRepository, STORAGE_KEYS } from "../src/index";

// Mock localStorage for Node.js environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    }
  };
})();
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

describe("daily drill repository", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("initial state", async () => {
    const repo = createLocalDailyDrillRepository();
    const progress = await repo.get();
    expect(progress).toEqual({
      lastCompletedDate: null,
      streak: 0,
      completedDates: []
    });
  });

  test("complete first drill", async () => {
    const repo = createLocalDailyDrillRepository();
    const progress = await repo.complete("2024-05-10");
    expect(progress).toEqual({
      lastCompletedDate: "2024-05-10",
      streak: 1,
      completedDates: ["2024-05-10"]
    });
  });

  test("complete duplicate drill same day", async () => {
    const repo = createLocalDailyDrillRepository();
    await repo.complete("2024-05-10");
    const progress = await repo.complete("2024-05-10");
    
    expect(progress.streak).toBe(1);
    expect(progress.completedDates).toEqual(["2024-05-10"]);
  });

  test("complete consecutive days increments streak", async () => {
    const repo = createLocalDailyDrillRepository();
    await repo.complete("2024-05-10");
    const progress = await repo.complete("2024-05-11");
    
    expect(progress.streak).toBe(2);
    expect(progress.lastCompletedDate).toBe("2024-05-11");
    expect(progress.completedDates).toEqual(["2024-05-10", "2024-05-11"]);
  });

  test("missing a day resets streak", async () => {
    const repo = createLocalDailyDrillRepository();
    await repo.complete("2024-05-10");
    const progress = await repo.complete("2024-05-12"); // diff > 1
    
    expect(progress.streak).toBe(1);
    expect(progress.completedDates).toEqual(["2024-05-10", "2024-05-12"]);
  });

  test("handles corrupted storage gracefully", async () => {
    localStorage.setItem(STORAGE_KEYS.dailyDrillProgress, JSON.stringify({ streak: "broken" }));
    const repo = createLocalDailyDrillRepository();
    const progress = await repo.get();
    
    expect(progress).toEqual({
      lastCompletedDate: null,
      streak: 0,
      completedDates: []
    });
  });
});
