import { builtInSnippets } from "./index";
import { practicePacks } from "./practice-packs";
import type { Snippet } from "./types";

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
  }
  return Math.abs(hash);
}

export function getDailyDrillSnippet(dateString: string): Snippet | null {
  if (builtInSnippets.length === 0) return null;
  
  // Dedupe snippet IDs from practice packs
  const packSnippetIds = new Set<string>();
  for (const pack of practicePacks) {
    for (const id of pack.snippetIds) {
      packSnippetIds.add(id);
    }
  }
  
  // Filter builtInSnippets that are inside packs
  const pool = builtInSnippets.filter(s => packSnippetIds.has(s.id));
  const finalPool = pool.length > 0 ? pool : builtInSnippets;
  
  if (finalPool.length === 0) return null;
  
  const hash = hashString(dateString);
  const index = hash % finalPool.length;
  
  return finalPool[index]!;
}
