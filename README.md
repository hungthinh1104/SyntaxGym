<div align="center">
  <h1>⚡ SyntaxGym</h1>
  <p><strong>A local-first code typing trainer for building Rust syntax muscle memory.</strong></p>
  
  <p>
    Live Demo (Coming soon)
    ·
    <a href="https://syntaxgym.online/docs/what-is-syntaxgym">Documentation</a>
    ·
    <a href="#contributing">Contributing</a>
  </p>
</div>


## 🔒 No login, no paywall, local-first

SyntaxGym is fully local-first. We do not track your typing data, we do not require a login, and there are no paywalls. Everything from your custom code snippets to your typing history is stored securely in your browser's `localStorage`.

## 🤔 Why this exists

Monkeytype is fantastic for general typing speed, but when learning a systems programming language like Rust, the bottleneck isn't raw WPM—it's the friction of unfamiliar syntax tokens like `Option<T>`, `Result<T, E>`, `&mut self`, `match`, and `::`. 

SyntaxGym isn't a compiler, and it isn't a LeetCode clone. It is a targeted typing trainer that:
- Detects common Rust syntax tokens and highlights syntax errors specific to code (`=>`, `&`, etc.)
- Helps you practice precise syntax repetition until the structure becomes muscle memory.
- Analyzes your "weak tokens" so you know exactly which syntax patterns are slowing down your flow.

## 🚀 Features

- **Built-in Rust & DSA Snippets:** Practice exactly what you type in real projects.
- **Token-Aware Analytics:** Get a diagnostic report of your missed tokens (e.g., `::`, `Ok()`).
- **Custom Code Snippets:** Paste your own difficult code blocks to train your muscle memory.
- **Flat SST Design:** A distraction-free, technical interface built with Tailwind v4.

## ⚠️ Known Limitations

- **Heuristic Token Detection:** SyntaxGym uses regex-based heuristic Rust token detection, not a true Rust parser or WASM AST.
- **SPA Metadata:** This is a Client-Side React SPA. Stronger SEO for dynamic pages may require prerendering later.
- **Persistence:** All data is currently stored in `localStorage` only.


## 🗺️ Roadmap

- [x] Core typing engine and Rust syntax highlighting
- [x] Local-first session history and analytics
- [x] Custom snippet library
- [x] GEO (Generative Engine Optimization) friendly documentation
- [ ] Vim mode emulation (hjkl navigation, insert mode)
- [ ] WASM-based real-time AST validation for Rust
- [ ] Export/Import local data (JSON)
- [ ] Expanded snippet library for Go and TypeScript

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

For maintainers preparing a release, please follow the [Launch Checklist](docs/LAUNCH_CHECKLIST.md).

## ☁️ Deployment

SyntaxGym is optimized for Vercel deployment.
Since canonical URLs and Open Graph tags require an absolute URL, you must provide your production domain as an environment variable.

1. Set `VITE_SITE_URL` in your Vercel Project Settings (e.g., `https://syntaxgym.online`).
2. Ensure the URL does not have a trailing slash.

See `.env.example` for details.

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
