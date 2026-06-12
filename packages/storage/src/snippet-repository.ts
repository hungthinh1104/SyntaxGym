import type { Snippet } from "@syntaxgym/content";
import { STORAGE_KEYS } from "./keys";
import { safeParseJson } from "./safe-json";

export type SnippetRepository = {
  listCustom(): Promise<Snippet[]>;
  saveCustom(snippet: Snippet): Promise<void>;
  removeCustom(id: string): Promise<void>;
};

export function createLocalSnippetRepository(): SnippetRepository {
  return {
    async listCustom() {
      return readSnippets();
    },

    async saveCustom(snippet) {
      const snippets = readSnippets();
      const next = [snippet, ...snippets.filter((item) => item.id !== snippet.id)];
      localStorage.setItem(STORAGE_KEYS.customSnippets, JSON.stringify(next));
    },

    async removeCustom(id) {
      const snippets = readSnippets().filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.customSnippets, JSON.stringify(snippets));
    }
  };
}

function readSnippets(): Snippet[] {
  return safeParseJson<Snippet[]>(localStorage.getItem(STORAGE_KEYS.customSnippets), []);
}
