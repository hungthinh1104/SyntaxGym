# Product Roadmap

## Deferred Technical Debts

### Static Prerendering (SEO)
**Status:** Deferred
**Reason:** SyntaxGym is currently structured as a pure Vite Single Page Application (SPA). Implementing static prerendering for docs pages would require introducing a heavy SSR framework (like Next.js or Remix), or adding a complex Puppeteer/DOM-server build script into the CI/CD pipeline. Given the "local-first, no backend, no dependencies" constraint, adding these heavy dependencies or altering the architecture poses an unacceptable risk at this stage.
**Future Action:** Re-evaluate lightweight prerendering plugins (e.g., `vite-plugin-ssr` or `prerender-spa-plugin`) if SEO indexability becomes a critical bottleneck. Static prerendering remains the main SEO limitation. Google can usually render JavaScript, but non-Google and AI crawlers may see less content. This is accepted for the current no-backend/no-heavy-dependency MVP and documented as a future improvement.
