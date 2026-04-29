import type { PageComponent } from "../types";

export const About: PageComponent = {
  meta: {
    title: "Documentation | BunForge",
    description: "Learn how to use and customize the BunForge starter template."
  },
  render: () => {
    return `
    <div class="max-w-4xl mx-auto w-full animate-fade-in text-left space-y-12">
      
      <!-- Header -->
      <div class="border-b pb-8" style="border-color: var(--border-color)">
        <h1 class="text-5xl font-black mb-6 tracking-tight" style="color: var(--text-main)">Documentation</h1>
        <p class="text-2xl font-light leading-relaxed" style="color: var(--text-muted)">
          Everything you need to know to build production-ready static sites with BunForge.
        </p>
      </div>

      <!-- Section: How it Works -->
      <section class="space-y-6">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 font-bold">1</div>
          <h2 class="text-3xl font-bold" style="color: var(--text-main)">How It Works</h2>
        </div>
        <p class="text-lg leading-relaxed" style="color: var(--text-muted)">
          BunForge eschews complex frameworks for a simple, Vanilla TypeScript approach. 
          Pages are defined as simple objects exporting a <code style="background-color: var(--bg-surface); color: var(--color-brand-600)" class="px-2 py-1 rounded">meta</code> property for SEO, 
          and a <code style="background-color: var(--bg-surface); color: var(--color-brand-600)" class="px-2 py-1 rounded">render()</code> function returning a raw HTML string.
        </p>
        <div style="background-color: var(--bg-surface); border-color: var(--border-color);" class="border rounded-2xl p-6 shadow-inner font-mono text-sm overflow-x-auto text-emerald-500 dark:text-emerald-300">
<pre><code>export const MyPage: PageComponent = {
  meta: { title: "Hello World", description: "..." },
  render: () => \`&lt;h1&gt;Welcome!&lt;/h1&gt;\`
};</code></pre>
        </div>
      </section>

      <!-- Section: Routing -->
      <section class="space-y-6">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 font-bold">2</div>
          <h2 class="text-3xl font-bold" style="color: var(--text-main)">Routing & Generation</h2>
        </div>
        <p class="text-lg leading-relaxed" style="color: var(--text-muted)">
          To create a new page, simply create a file in <code style="color: var(--color-brand-500)">src/pages/</code> and register it in <code style="color: var(--color-brand-500)">src/router.ts</code>. 
          When you run the build command, BunForge dynamically creates the nested directory structure inside <code style="color: var(--color-brand-500)">dist/</code> 
          (e.g., <code style="color: var(--color-brand-500)">dist/my-page/index.html</code>) ensuring clean URLs!
        </p>
      </section>

      <!-- Section: Styling -->
      <section class="space-y-6">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 font-bold">3</div>
          <h2 class="text-3xl font-bold" style="color: var(--text-main)">Styling with Tailwind v4</h2>
        </div>
        <p class="text-lg leading-relaxed" style="color: var(--text-muted)">
          BunForge uses Bun's native bundler plugin for Tailwind CSS. Write standard Tailwind classes in your HTML strings.
          The build pipeline will automatically parse your TypeScript files, extract the utilities, and emit a highly optimized <code style="color: var(--color-brand-500)">main.css</code>.
        </p>
      </section>
      
      <!-- Section: Deployment -->
      <section class="space-y-6 bg-brand-500/5 p-8 border border-brand-500/20 rounded-3xl">
        <h2 class="text-2xl font-bold flex items-center gap-3" style="color: var(--color-brand-600)">
          <svg class="w-6 h-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          Ready for Production
        </h2>
        <p class="leading-relaxed" style="color: var(--text-muted)">
          The <code style="background-color: var(--bg-surface); color: var(--color-brand-500)" class="px-2 py-1 rounded">dist/</code> directory contains pure, minified HTML, CSS, and JS. 
          It can be deployed anywhere: Vercel, Netlify, Cloudflare Pages, GitHub Pages, or any standard static file host.
        </p>
      </section>

    </div>
  `;
  }
};
