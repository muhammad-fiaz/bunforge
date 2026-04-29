import type { PageMeta } from "./types";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export function renderLayout(meta: PageMeta, content: string) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${meta.description}">
  <title>${meta.title}</title>
  <link href="/main.css" rel="stylesheet">
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen font-sans flex flex-col selection:bg-blue-500 selection:text-white">
  ${Navbar()}
  
  <main class="grow flex flex-col items-center justify-center max-w-5xl mx-auto w-full px-6 py-12 transition-all duration-300 transform" id="app-content">
    ${content}
  </main>

  ${Footer()}
  
  <script src="/main.js" type="module"></script>
</body>
</html>`;
}
