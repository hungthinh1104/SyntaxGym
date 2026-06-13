# 🚀 Launch Checklist

A concise checklist for maintainers before and after deploying SyntaxGym.

## Pre-Deploy / CI Checks
- `pnpm install --frozen-lockfile`
- `pnpm check` (Runs `typecheck`, `test`, and `build`)
- Check `apps/web/dist/robots.txt` exists and is correct.
- Check `apps/web/dist/sitemap.xml` exists and does not contain `/history`.

## Deployment
- Deploy to Vercel (or preferred host).
- Ensure `VITE_SITE_URL` environment variable is set to the production domain without a trailing slash (e.g., `https://syntaxgym.dev`).

## Post-Deploy Smoke Test
1. Open `/practice`
2. Type a snippet
3. Intentionally make a mistake
4. Backspace and correct it
5. Finish the session and click save result
6. Open `/history` and verify the session appears
7. Create a custom snippet
8. Confirm Save & Practice navigates to `/practice`
9. Confirm >5000 character custom snippet is blocked
10. Hard-refresh `/docs/what-is-syntaxgym`
11. Hard-refresh `/docs/rust-typing-practice`
12. Open `/robots.txt`
13. Open `/sitemap.xml`
