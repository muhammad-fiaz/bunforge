import { useEffect } from "../hooks/effect";
import { useState } from "../hooks/state";
import { useRef } from "../hooks/ref";
import type { PageComponent } from "../types";

export const Home: PageComponent = {
  meta: {
    title: "BunForge | Modern Static Starter",
    description: "A minimal, modern static website starter powered by Bun and Tailwind CSS v4."
  },
  client: () => {
    // 1. Initialize State
    const [getCount, setCount, subscribeCount] = useState(0);

    // 3. Demonstrate useEffect with cleanup
    useEffect(() => {
      console.log("Home Page Demo Mounted!");
      
      const countEl = document.getElementById("demo-count");
      const incBtn = document.getElementById("demo-inc");
      const decBtn = document.getElementById("demo-dec");
      
      // 2. Subscribe to state changes to update the DOM
      const unsubscribe = subscribeCount((newVal) => {
        if (countEl) countEl.innerText = newVal.toString();
      });
      
      const inc = () => setCount(getCount() + 1);
      const dec = () => setCount(getCount() - 1);
      
      if (incBtn) incBtn.addEventListener("click", inc);
      if (decBtn) decBtn.addEventListener("click", dec);

      return () => {
         // Cleanup runs automatically when navigating to /about or /contact!
         console.log("Home Page Demo Unmounted! Cleaning up listeners...");
         if (incBtn) incBtn.removeEventListener("click", inc);
         if (decBtn) decBtn.removeEventListener("click", dec);
         unsubscribe();
      };
    });
  },
  render: () => {
    return `
    <div class="text-center w-full animate-fade-in" id="home-wrapper">
      <div class="inline-flex items-center justify-center p-4 bg-brand-500/10 rounded-3xl mb-8 border border-brand-500/20 shadow-lg shadow-brand-500/5">
        <svg class="w-16 h-16 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      </div>
      
      <h1 class="text-6xl md:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-linear-to-br from-slate-300 to-slate-800 dark:from-slate-100 dark:to-slate-500">
        Build faster with <span class="text-transparent bg-clip-text bg-linear-to-r from-brand-400 to-emerald-400">BunForge</span>.
      </h1>
      
      <p class="text-2xl mb-12 leading-relaxed font-light max-w-3xl mx-auto" style="color: var(--text-muted)">
        A highly opinionated, zero-configuration static site generator. Powered entirely by <strong style="color: var(--text-main)" class="font-semibold">Bun</strong> and <strong style="color: var(--text-main)" class="font-semibold">Tailwind v4</strong>. No Webpack. No bloat.
      </p>
      
      <div class="flex flex-wrap gap-4 justify-center mb-24">
        <a href="/about" class="px-8 py-4 text-lg rounded-2xl shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 inline-flex items-center justify-center font-semibold transition-all duration-300 bg-brand-600 hover:bg-brand-500 text-white border border-brand-500/50">
          Read Documentation
        </a>
        <a href="https://github.com/muhammad-fiaz/bunforge" target="_blank" style="background-color: var(--bg-surface); color: var(--text-main); border-color: var(--border-color);" class="px-8 py-4 text-lg rounded-2xl inline-flex items-center justify-center font-semibold transition-all duration-300 border hover:opacity-80">
          View on GitHub
        </a>
      </div>

      <!-- Feature Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-6xl mx-auto mb-20">
        <div class="p-8 rounded-3xl bg-surface border border-bdr hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-2xl mb-6 border border-emerald-500/20 shadow-inner">🚀</div>
          <h3 class="text-xl font-bold text-content mb-3">Blazing Fast Builds</h3>
          <p class="text-muted leading-relaxed">Leverages Bun's native bundler and transpiler. Your entire site builds in milliseconds, not seconds.</p>
        </div>
        
        <div class="p-8 rounded-3xl bg-surface border border-bdr hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl mb-6 border border-blue-500/20 shadow-inner">🎨</div>
          <h3 class="text-xl font-bold text-content mb-3">Tailwind CSS v4</h3>
          <p class="text-muted leading-relaxed">Built-in support for the latest Tailwind CSS Engine. Write modern utility classes with zero PostCSS configuration.</p>
        </div>
        
        <div class="p-8 rounded-3xl bg-surface border border-bdr hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <div class="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-2xl mb-6 border border-brand-500/20 shadow-inner">⚡</div>
          <h3 class="text-xl font-bold text-content mb-3">SPA-Like Routing</h3>
          <p class="text-muted leading-relaxed">Lightweight client-side router intercepts navigations, giving you instantaneous page transitions out of the box.</p>
        </div>
      </div>

      <!-- Interactive Demo Section -->
      <div class="p-8 border border-bdr rounded-3xl bg-surface max-w-2xl mx-auto text-left shadow-2xl">
        <h3 class="text-2xl font-bold text-content mb-4 flex items-center gap-3">
          <span class="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-500 text-lg">🧪</span>
          Live State Hook Demo
        </h3>
        <p class="text-muted mb-6 leading-relaxed">
          This counter is completely fully interactive! It is powered by BunForge's built-in <code class="text-emerald-500 bg-base px-2 py-1 rounded border border-bdr">useState</code> and <code class="text-emerald-500 bg-base px-2 py-1 rounded border border-bdr">useEffect</code> directly within Vanilla JS.
        </p>
        
        <div class="flex items-center gap-6 bg-base p-6 rounded-2xl border border-bdr shadow-inner">
          <button id="demo-dec" class="px-6 py-3 font-bold text-xl bg-surface border border-bdr hover:opacity-80 rounded-xl text-content transition-colors active:scale-95">-</button>
          <div class="text-4xl font-mono font-black text-emerald-500 w-16 text-center" id="demo-count">0</div>
          <button id="demo-inc" class="px-6 py-3 font-bold text-xl bg-brand-600 hover:bg-brand-500 rounded-xl text-white transition-colors shadow-lg shadow-brand-500/20 active:scale-95">+</button>
        </div>
      </div>
    </div>
  `;
  }
};
