# SEO Launch Checklist

This checklist ensures that SyntaxGym is properly registered, indexed, and crawlable by Google Search Console. It should be completed after deploying the production application.

## 1. Domain Verification
- [ ] Verify ownership of `syntaxgym.online` in Google Search Console using the DNS TXT record method.
- [ ] Confirm that `www.syntaxgym.online` correctly redirects to `https://syntaxgym.online` at the DNS/Vercel level.

## 2. Sitemap and Robots
- [ ] Open `https://syntaxgym.online/robots.txt` and confirm it is plain text containing the correct Sitemap URL.
- [ ] Open `https://syntaxgym.online/sitemap.xml` and confirm it renders as valid XML, not React HTML.
- [ ] Submit `https://syntaxgym.online/sitemap.xml` in the Google Search Console "Sitemaps" section.
- [ ] Verify that `/history` is **not** included in the sitemap.

## 3. URL Inspection & Indexing
Use the URL Inspection tool in Google Search Console to manually Request Indexing for these high-intent routes:
- [ ] `https://syntaxgym.online/`
- [ ] `https://syntaxgym.online/docs/what-is-syntaxgym`
- [ ] `https://syntaxgym.online/docs/rust-typing-practice`
- [ ] `https://syntaxgym.online/docs/rust-option-result-practice`
- [ ] `https://syntaxgym.online/docs/rust-enum-match-practice`
- [ ] `https://syntaxgym.online/snippets`
- [ ] `https://syntaxgym.online/practice`

## 4. Expectations
- **Indexing Takes Time:** New domains can take days or weeks to appear in Google search results.
- **No Guarantees:** Submitting a sitemap helps discovery but does not guarantee indexing.
- **Prerendering Deferred:** SyntaxGym currently relies on Google's ability to render Client-Side React (SPA). We have explicitly deferred static HTML prerendering (SSG) because it introduces significant architectural risk (e.g., hydration mismatches and `entry-server.tsx` complexity) to a simple local-first application. This may be reconsidered as a future improvement if indexing proves problematic over a long period.
