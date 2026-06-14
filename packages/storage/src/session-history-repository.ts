import { STORAGE_KEYS } from "./keys";
import { safeParseJson } from "./safe-json";

export type PersistedSessionResult = {
  id: string;
  snippetId: string;
  snippetTitle: string;
  language: string;
  finishedAt: string;
  durationMs: number;
  adjustedWpm: number;
  accuracy: number;
  mistakes: number;
  weakTokens: Array<{ token: string; misses: number }>;
};

export type SessionHistoryRepository = {
  list(): Promise<PersistedSessionResult[]>;
  save(result: PersistedSessionResult): Promise<void>;
  clear(): Promise<void>;
  replaceAll(history: PersistedSessionResult[]): Promise<void>;
};

export function createLocalSessionHistoryRepository(): SessionHistoryRepository {
  return {
    async list() {
      return readHistory();
    },

    async save(result) {
      const history = readHistory();
      const next = [result, ...history.filter(item => item.id !== result.id)].slice(0, 100);
      localStorage.setItem(STORAGE_KEYS.sessionHistory, JSON.stringify(next));
    },

    async clear() {
      localStorage.removeItem(STORAGE_KEYS.sessionHistory);
    },

    async replaceAll(history) {
      localStorage.setItem(STORAGE_KEYS.sessionHistory, JSON.stringify(history));
    }
  };
}

function readHistory(): PersistedSessionResult[] {
  return safeParseJson<PersistedSessionResult[]>(localStorage.getItem(STORAGE_KEYS.sessionHistory), []);
}
