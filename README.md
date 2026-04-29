# BunForge

A minimal, lightning-fast static site generator powered entirely by [Bun](https://bun.com) and Tailwind CSS v4. No bloated frameworks, just a beautifully simple Vanilla TypeScript environment.

## ✨ Features
- **Zero Config Tailwind v4**: Powered directly by Bun's native bundler plugin.
- **Blazing Fast**: Compiles your entire multi-page site in milliseconds.
- **Client-Side SPA Router**: Instant, smooth transitions without full page reloads.
- **Modular Hooks System**: Built-in, Vanilla JS implementations of `useState`, `useEffect`, and `useRef`!
- **SEO Ready**: Easy metadata management for every page route.

## 🚀 Installation & Usage

1. **Clone & Install Dependencies**
   ```bash
   bun install
   ```

2. **Start the Development Server**
   ```bash
   bun run dev
   ```
   *Runs a local server with an automatic watcher on `localhost:3000`.*

3. **Build for Production**
   ```bash
   bun run build
   ```
   *Outputs a production-ready, minified static site to the `dist/` directory.*

## 📁 Architecture
- `src/router.ts`: Define all your page routes here.
- `src/pages/`: Create your TypeScript functions that return HTML strings.
- `src/hooks/`: A modular system containing reusable `state.ts`, `effect.ts`, and `ref.ts` logic.
- `src/utils/`: Useful helper functions like `cn()` and `fetchJson()`.

## 📜 License
This project is licensed under the [MIT License](LICENSE).
