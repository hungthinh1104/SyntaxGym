# Product Roadmap

## Deferred Technical Debts

### Static Prerendering (SEO)
**Status:** Deferred
**Reason:** SyntaxGym is currently structured as a pure Vite Single Page Application (SPA). Implementing static prerendering for docs pages would require introducing a heavy SSR framework (like Next.js or Remix), or adding a complex Puppeteer/DOM-server build script into the CI/CD pipeline. Given the "local-first, no backend, no dependencies" constraint, adding these heavy dependencies or altering the architecture poses an unacceptable risk at this stage.
**Future Action:** Re-evaluate lightweight prerendering plugins (e.g., `vite-plugin-ssr` or `prerender-spa-plugin`) if SEO indexability becomes a critical bottleneck. For now, Googlebot handles client-side rendered React Helmet tags reasonably well.
