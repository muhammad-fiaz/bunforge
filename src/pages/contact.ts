import { useEffect } from "../hooks/effect";
import { useState } from "../hooks/state";
import { useRef } from "../hooks/ref";
import type { PageComponent } from "../types";

export const Contact: PageComponent = {
  meta: {
    title: "Contact | BunForge",
    description: "Get in touch with us."
  },
  client: () => {
    // 1. Initialize logic
    const [getName, setName, subscribeName] = useState("");
    const formRef = useRef<HTMLFormElement | null>(null);

    // 2. Setup Effect
    useEffect(() => {
      console.log('Contact form mounted. Current name:', getName());
      
      const unsubscribe = subscribeName((newName) => {
         console.log('User typing name:', newName);
      });
      
      const inputEl = document.getElementById('contact-name-input') as HTMLInputElement;
      let handler: (e: Event) => void;
      
      if (inputEl) {
        handler = (e: Event) => setName((e.target as HTMLInputElement).value);
        inputEl.addEventListener('input', handler);
        formRef.current = inputEl.closest('form');
        
        return () => {
          inputEl.removeEventListener('input', handler);
          unsubscribe();
          console.log('Contact form unmounted');
        }
      }
      return () => unsubscribe();
    });
  },
  render: () => {
    return `
    <div class="max-w-xl mx-auto w-full">
      <div class="text-center mb-10">
        <h1 class="text-5xl font-bold mb-4" style="color: var(--text-main)">Get in Touch</h1>
        <p class="text-lg" style="color: var(--text-muted)">We'd love to hear from you. Send us a message.</p>
      </div>
      <form class="space-y-6 p-10 border rounded-4xl shadow-xl" style="background-color: var(--bg-surface); border-color: var(--border-color);" onsubmit="event.preventDefault(); alert('Message sent successfully!');">
        <div>
          <label class="block text-sm font-medium mb-2" style="color: var(--text-muted)">Name</label>
          <input id="contact-name-input" type="text" class="w-full px-5 py-4 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:outline-none transition-all shadow-inner" style="background-color: var(--bg-color); border: 1px solid var(--border-color); color: var(--text-main);" placeholder="Your name" required>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2" style="color: var(--text-muted)">Email</label>
          <input type="email" class="w-full px-5 py-4 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:outline-none transition-all shadow-inner" style="background-color: var(--bg-color); border: 1px solid var(--border-color); color: var(--text-main);" placeholder="you@example.com" required>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2" style="color: var(--text-muted)">Message</label>
          <textarea rows="4" class="w-full px-5 py-4 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:outline-none transition-all shadow-inner resize-none" style="background-color: var(--bg-color); border: 1px solid var(--border-color); color: var(--text-main);" placeholder="How can we help?" required></textarea>
        </div>
        <button type="submit" class="w-full px-8 py-4 text-lg rounded-2xl shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 inline-flex items-center justify-center font-semibold transition-all duration-300 bg-brand-600 hover:bg-brand-500 text-white border border-brand-500/50">
          Send Message
        </button>
      </form>
    </div>
  `;
  }
};
