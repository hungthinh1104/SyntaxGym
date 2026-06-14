import { STORAGE_KEYS } from "./keys";
import { safeParseJson } from "./safe-json";

export type DailyDrillProgress = {
  lastCompletedDate: string | null;
  streak: number;
  completedDates: string[];
};

export type DailyDrillRepository = {
  get(): Promise<DailyDrillProgress>;
  complete(dateString: string): Promise<DailyDrillProgress>;
  clear(): Promise<void>;
  replaceAll(progress: DailyDrillProgress): Promise<void>;
};

const DEFAULT_PROGRESS: DailyDrillProgress = {
  lastCompletedDate: null,
  streak: 0,
  completedDates: []
};

export function createLocalDailyDrillRepository(): DailyDrillRepository {
  return {
    async get() {
      return readProgress();
    },
    async complete(dateString) {
      const progress = readProgress();
      if (progress.completedDates.includes(dateString)) {
        return progress; // Idempotent
      }
      
      const newCompletedDates = Array.from(new Set([...progress.completedDates, dateString]));
      let newStreak = progress.streak;
      
      if (!progress.lastCompletedDate) {
        newStreak = 1;
      } else {
        // Use manual Date.UTC parsing for strict YYYY-MM-DD
        const parseDate = (d: string) => {
          const [y, m, day] = d.split("-").map(Number);
          return Date.UTC(y!, m! - 1, day!);
        };
        
        const lastDate = parseDate(progress.lastCompletedDate);
        const currentDate = parseDate(dateString);
        
        const diffDays = Math.round(Math.abs(currentDate - lastDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      }
      
      const nextProgress: DailyDrillProgress = {
        lastCompletedDate: dateString,
        streak: newStreak,
        completedDates: newCompletedDates
      };
      
      try {
        localStorage.setItem(STORAGE_KEYS.dailyDrillProgress, JSON.stringify(nextProgress));
      } catch (e) {
        // Fail gracefully
      }
      return nextProgress;
    },
    
    async clear() {
      localStorage.removeItem(STORAGE_KEYS.dailyDrillProgress);
    },

    async replaceAll(progress) {
      localStorage.setItem(STORAGE_KEYS.dailyDrillProgress, JSON.stringify(progress));
    }
  };
}

function readProgress(): DailyDrillProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.dailyDrillProgress);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = safeParseJson<any>(raw, DEFAULT_PROGRESS);
    
    // Guard against corruption
    if (typeof parsed !== "object" || parsed === null) return DEFAULT_PROGRESS;
    if (typeof parsed.streak !== "number" || !Array.isArray(parsed.completedDates)) return DEFAULT_PROGRESS;
    
    return {
      lastCompletedDate: typeof parsed.lastCompletedDate === "string" ? parsed.lastCompletedDate : null,
      streak: parsed.streak,
      completedDates: parsed.completedDates
    };
  } catch (e) {
    return DEFAULT_PROGRESS;
  }
}
