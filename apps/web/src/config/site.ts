export const SITE_NAME = "SyntaxGym";
export const DEFAULT_SITE_URL = "https://syntaxgym.online";

export function getSiteUrl(): string {
  const url = import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL;
  return url.replace(/\/$/, "");
}
