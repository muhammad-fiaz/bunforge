import { ThemeToggle } from "../utils/ThemeToggle";

export function Navbar() {
  return `
    <nav class="w-full bg-base/80 backdrop-blur-md border-b border-bdr sticky top-0 z-50 transition-all">
      <div class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" class="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-brand-400 to-emerald-400 flex items-center gap-2">
          <svg class="w-6 h-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          BunForge
        </a>
        <div class="flex items-center gap-6 text-sm font-medium text-muted">
          <a href="/" class="hover:text-brand-500 transition-colors">Home</a>
          <a href="/about" class="hover:text-brand-500 transition-colors">About</a>
          <a href="/contact" class="hover:text-brand-500 transition-colors">Contact</a>
          <div class="w-px h-6 bg-bdr"></div>
          ${ThemeToggle()}
        </div>
      </div>
    </nav>
  `;
}
