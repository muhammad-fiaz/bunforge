import { useState } from "../hooks/state";
import { useEffect } from "../hooks/effect";

export function ThemeToggle() {
  return `
    <button id="theme-toggle-btn" class="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-bdr text-content hover:bg-black/5 hover:opacity-80 transition-colors shadow-sm" aria-label="Toggle Theme">
      <svg id="theme-icon-sun" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
      <svg id="theme-icon-moon" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
    </button>
  `;
}

export function initThemeToggle() {
  if (typeof window === 'undefined') return;

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  const [getTheme, setTheme, subscribeTheme] = useState(initialTheme);

  useEffect(() => {
    const btn = document.getElementById('theme-toggle-btn');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    
    if (!btn || btn.dataset.initialized) return;
    btn.dataset.initialized = "true";

    const applyTheme = (theme: string) => {
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (sunIcon) sunIcon.classList.remove('hidden');
        if (moonIcon) moonIcon.classList.add('hidden');
      } else {
        document.documentElement.removeAttribute('data-theme');
        if (sunIcon) sunIcon.classList.add('hidden');
        if (moonIcon) moonIcon.classList.remove('hidden');
      }
      localStorage.setItem('theme', theme);
    };

    applyTheme(getTheme());

    const unsubscribe = subscribeTheme((newTheme) => {
      applyTheme(newTheme);
    });

    const toggleTheme = () => {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    };

    btn.addEventListener('click', toggleTheme);

    return () => {
       btn.removeEventListener('click', toggleTheme);
       unsubscribe();
       btn.removeAttribute('data-initialized');
    };
  });
}
