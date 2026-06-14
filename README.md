<div align="center">
  <h1>⚡ SyntaxGym</h1>
  <p><strong>A local-first code typing trainer for building Rust syntax muscle memory.</strong></p>
  
  <p>
    <a href="https://syntaxgym.online">Live Demo</a>
    ·
    <a href="https://syntaxgym.online/docs">Documentation</a>
    ·
    <a href="#contributing">Contributing</a>
  </p>
</div>

## 🔒 Local-first & Honest Design

SyntaxGym is a targeted typing trainer that detects common Rust syntax tokens (like `=>`, `::`, `&mut`) and analyzes your "weak tokens". 

**What it is:**
- A muscle memory trainer for systems programming languages.
- Fully local-first. We do not track your typing data, require a login, or use paywalls. Everything is stored locally in your browser's `localStorage`.

**What it is not:**
- SyntaxGym uses heuristic token detection. It is not a Rust compiler or parser.
- It is not a LeetCode clone and does not scrape LeetCode. 

## 🚀 Features

- **Built-in Rust & DSA Snippets:** Practice exact, real-world code structures.
- **Token-Aware Engine:** Rather than just checking letters, SyntaxGym detects common code syntax tokens, helping you focus on complete syntax patterns like `Result<T, E>`.
- **Custom Code Snippets:** Paste your own difficult code blocks to train.
- **Flat SST Design:** Distraction-free, technical interface.

## 💻 Running Locally

This is a Vite + React + TypeScript application managed in a pnpm workspace.

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Navigate to `http://localhost:5174` to start typing.

## 🚀 Launch & Smoke Test

For maintainers preparing a release, please follow the [Launch Checklist](docs/LAUNCH_CHECKLIST.md) and the [SEO Launch Checklist](docs/SEO_CHECKLIST.md).

## ☁️ Deployment

SyntaxGym is optimized for Vercel deployment. Since canonical URLs and Open Graph tags require an absolute URL, you must provide your production domain as an environment variable.

1. Set `VITE_SITE_URL` in your Vercel Project Settings (e.g., `https://syntaxgym.online`).
2. Ensure the URL does not have a trailing slash.

## 🤝 Contributing

We welcome contributions! Because SyntaxGym is a lightweight, local-first tool, adding new snippets or refining the UI is straightforward.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make sure type checks pass (`pnpm typecheck`)
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

*SyntaxGym is open-source and built for the developer community.*
