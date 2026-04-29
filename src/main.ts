import "./styles.css";
import { useState } from "./hooks/state";
import { useRef } from "./hooks/ref";
import { useEffect, _triggerHooks } from "./hooks/effect";
import { initThemeToggle } from "./utils/ThemeToggle";
import { routes } from "./router";

// Expose framework hooks globally for inline page scripts!
(window as any).BunForge = { useState, useRef, useEffect };
window.dispatchEvent(new Event("bunforge:ready"));

console.log("BunForge SPA Router is running!");

// Initialize components outside of SPA router pages
initThemeToggle();

// Clean client execution without bulky matching rules
function runClientLogic(pathname: string) {
  const currentRoute = routes.find(r => r.path === pathname || r.path === pathname + ".html");
  if (currentRoute?.component.client) {
    currentRoute.component.client();
  }
}

// Client-side router for SPA-like fast navigation
document.addEventListener("click", async (e) => {
  const target = (e.target as HTMLElement).closest("a");
  if (!target) return;
  
  const href = target.getAttribute("href");
  const targetAttr = target.getAttribute("target");
  
  if (href && href.startsWith("/") && !href.startsWith("//") && targetAttr !== "_blank") {
    e.preventDefault();
    await navigate(href);
  }
});

window.addEventListener("popstate", async () => {
  await navigate(location.pathname, false);
});

async function navigate(path: string, push = true) {
  const main = document.querySelector("#app-content");
  if (!main) return;

  // Add transition classes
  main.classList.add("opacity-0", "-translate-y-4");
  
  try {
    const res = await fetch(path);
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    
    const newMain = doc.querySelector("#app-content");
    if (newMain) {
       // Wait for fade out
       await new Promise(r => setTimeout(r, 150));
       
       main.innerHTML = newMain.innerHTML;
       document.title = doc.title;
       
       // Execute any inline scripts in the new page!
       const scripts = main.querySelectorAll("script");
       scripts.forEach(oldScript => {
         const newScript = document.createElement("script");
         Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
         newScript.appendChild(document.createTextNode(oldScript.innerHTML));
         oldScript.parentNode?.replaceChild(newScript, oldScript);
       });
       
       // Update meta description
       const metaDesc = document.querySelector('meta[name="description"]');
       const newMetaDesc = doc.querySelector('meta[name="description"]');
       if (metaDesc && newMetaDesc) {
           metaDesc.setAttribute("content", newMetaDesc.getAttribute("content") || "");
       }
       
       if (push) {
         history.pushState({}, "", path);
       }
       
       // Allow time for DOM to update before fading in
       requestAnimationFrame(() => {
           main.classList.remove("opacity-0", "-translate-y-4");
       });
       
       // Re-arm components
       runClientLogic(new URL(path, location.origin).pathname);
       _triggerHooks();
    }
  } catch (err) {
    console.error("Navigation failed", err);
    // Fallback to normal navigation
    window.location.href = path;
  }
}

// Initial hydration
runClientLogic(location.pathname);
_triggerHooks();
