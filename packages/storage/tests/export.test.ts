import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { 
  validateExportData, 
  createExportData, 
  importExportData, 
  clearAllLocalData,
  createLocalDailyDrillRepository,
  STORAGE_KEYS
} from "../src/index";

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

describe("local data export/import", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("createExportData generates valid schema without built-in snippets", async () => {
    const data = await createExportData();
    expect(data.app).toBe("syntaxgym");
    expect(data.version).toBe(1);
    expect(data.data.history).toEqual([]);
    expect(data.data.customSnippets).toEqual([]);
    expect(data.data.dailyDrillProgress).toEqual({
      lastCompletedDate: null,
      streak: 0,
      completedDates: []
    });
  });

  test("validateExportData rejects invalid shapes", () => {
    expect(() => validateExportData(null)).toThrow("Invalid export format: not an object.");
    expect(() => validateExportData({})).toThrow("Invalid export format: not a SyntaxGym export.");
    expect(() => validateExportData({ app: "syntaxgym", version: 2 })).toThrow("Unsupported export version: 2");
    expect(() => validateExportData({ app: "syntaxgym", version: 1 })).toThrow("Invalid export format: missing data object.");
    expect(() => validateExportData({ app: "syntaxgym", version: 1, data: {} })).toThrow("Invalid export format: missing or invalid history array.");
  });

  test("validateExportData accepts valid schema", () => {
    const valid = {
      app: "syntaxgym",
      version: 1,
      exportedAt: "2024-05-10T00:00:00.000Z",
      data: {
        history: [],
        customSnippets: [],
        dailyDrillProgress: null
      }
    };
    expect(() => validateExportData(valid)).not.toThrow();
    expect(validateExportData(valid)).toEqual(valid);
  });

  test("importExportData replaces existing data", async () => {
    const dailyRepo = createLocalDailyDrillRepository();
    await dailyRepo.complete("2024-05-10");

    const validImport = {
      app: "syntaxgym" as const,
      version: 1 as const,
      exportedAt: "2024-05-10T00:00:00.000Z",
      data: {
        history: [],
        customSnippets: [],
        dailyDrillProgress: {
          lastCompletedDate: "2024-01-01",
          streak: 5,
          completedDates: ["2024-01-01"]
        }
      }
    };

    await importExportData(validImport);

    const newProgress = await dailyRepo.get();
    expect(newProgress.streak).toBe(5);
    expect(newProgress.lastCompletedDate).toBe("2024-01-01");
  });

  test("clearAllLocalData clears all repositories", async () => {
    localStorage.setItem(STORAGE_KEYS.customSnippets, '[{"id":"test"}]');
    localStorage.setItem(STORAGE_KEYS.sessionHistory, '[{"id":"test"}]');
    
    await clearAllLocalData();
    
    expect(localStorage.getItem(STORAGE_KEYS.customSnippets)).toBeNull();
    expect(localStorage.getItem(STORAGE_KEYS.sessionHistory)).toBeNull();
  });
});
