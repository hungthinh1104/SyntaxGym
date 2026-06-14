import type { Snippet } from "@syntaxgym/content";

import { createLocalSessionHistoryRepository, type PersistedSessionResult } from "./session-history-repository";
import { createLocalSnippetRepository } from "./snippet-repository";
import { createLocalDailyDrillRepository, type DailyDrillProgress } from "./daily-drill-repository";

export type SyntaxGymExport = {
  version: 1;
  exportedAt: string;
  app: "syntaxgym";
  data: {
    history: PersistedSessionResult[];
    customSnippets: Snippet[];
    dailyDrillProgress: DailyDrillProgress | null;
  };
};

export async function createExportData(): Promise<SyntaxGymExport> {
  const historyRepo = createLocalSessionHistoryRepository();
  const snippetRepo = createLocalSnippetRepository();
  const dailyRepo = createLocalDailyDrillRepository();

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    app: "syntaxgym",
    data: {
      history: await historyRepo.list(),
      customSnippets: await snippetRepo.listCustom(),
      dailyDrillProgress: await dailyRepo.get()
    }
  };
}

export function validateExportData(data: unknown): SyntaxGymExport {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid export format: not an object.");
  }
  
  const obj = data as Record<string, unknown>;
  
  if (obj.app !== "syntaxgym") {
    throw new Error("Invalid export format: not a SyntaxGym export.");
  }
  
  if (obj.version !== 1) {
    throw new Error(`Unsupported export version: ${String(obj.version)}`);
  }
  
  if (!obj.data || typeof obj.data !== "object") {
    throw new Error("Invalid export format: missing data object.");
  }
  
  const dataObj = obj.data as Record<string, unknown>;
  
  if (!Array.isArray(dataObj.history)) {
    throw new Error("Invalid export format: missing or invalid history array.");
  }
  
  if (!Array.isArray(dataObj.customSnippets)) {
    throw new Error("Invalid export format: missing or invalid customSnippets array.");
  }
  
  if (dataObj.dailyDrillProgress !== null && typeof dataObj.dailyDrillProgress !== "object") {
    throw new Error("Invalid export format: invalid dailyDrillProgress.");
  }
  
  // Minimal checks pass. 
  // We assume the schema of individual items hasn't changed incompatibly since this is version 1.
  return data as SyntaxGymExport;
}

export async function importExportData(exportData: SyntaxGymExport): Promise<void> {
  const historyRepo = createLocalSessionHistoryRepository();
  const snippetRepo = createLocalSnippetRepository();
  const dailyRepo = createLocalDailyDrillRepository();

  await historyRepo.replaceAll(exportData.data.history);
  await snippetRepo.replaceAllCustom(exportData.data.customSnippets);
  
  if (exportData.data.dailyDrillProgress) {
    await dailyRepo.replaceAll(exportData.data.dailyDrillProgress);
  } else {
    await dailyRepo.clear();
  }
}

export async function clearAllLocalData(): Promise<void> {
  const historyRepo = createLocalSessionHistoryRepository();
  const snippetRepo = createLocalSnippetRepository();
  const dailyRepo = createLocalDailyDrillRepository();

  await historyRepo.clear();
  await snippetRepo.clearCustom();
  await dailyRepo.clear();
}
