import { useEffect } from "../hooks/effect";
import { useState } from "../hooks/state";
import { useRef } from "../hooks/ref";
import type { PageComponent } from "../types";

export const NotFound: PageComponent = {
  meta: {
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist."
  },
  render: () => {
    // Example of useState
    const [getCount, setCount] = useState(0);
    
    // Example of useRef
    const myRef = useRef<number>(0);

    // Example of useEffect
    useEffect(() => {
      console.log('404 Page Loaded with states initialized:', {
        count: getCount(),
        ref: myRef.current
      });
      setCount(1);
      myRef.current = 100;
      
      return () => console.log('404 Page Unloaded, final count:', getCount());
    });

    return `
    <div class="text-center py-20 w-full animate-fade-in flex flex-col items-center justify-center">
      <div class="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-3xl mb-8 border border-red-500/20">
        <svg class="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
      </div>
      <h1 class="text-9xl font-black drop-shadow-lg tracking-tighter" style="color: var(--text-main)">404</h1>
      <h2 class="text-4xl font-bold mb-6 tracking-tight" style="color: var(--text-main)">Page Not Found</h2>
      <p class="text-xl mb-10 max-w-lg" style="color: var(--text-muted)">Oops! The page you're looking for doesn't exist, has been moved, or the URL is incorrect.</p>
      <a href="/" class="px-8 py-4 text-lg rounded-2xl shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 inline-flex items-center justify-center font-semibold transition-all duration-300 bg-brand-600 hover:bg-brand-500 text-white border border-brand-500/50">
        Return Home
      </a>
    </div>
  `;
  }
};
