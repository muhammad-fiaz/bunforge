import { mkdir } from "node:fs/promises";
import tailwind from "bun-plugin-tailwind";

const isDev = process.argv.includes("--dev") || process.argv.includes("dev");

async function buildHtml() {
  const { routes } = await import("./src/router.ts");
  const { renderLayout } = await import("./src/layout.ts");

  for (const route of routes) {
    const content = route.component.render();
    const html = renderLayout(route.component.meta, content);
    
    let routePath = route.path.replace(/^\/+/, "");
    if (!routePath.endsWith(".html")) {
       routePath = routePath ? `${routePath}/index.html` : "index.html";
    }
    
    const filePath = `./dist/${routePath}`;
    const dirPath = filePath.substring(0, filePath.lastIndexOf("/"));
    
    if (dirPath !== "./dist") {
        await mkdir(dirPath, { recursive: true });
    }
    
    await Bun.write(filePath, html);
  }
}

async function buildJs() {
  await Bun.build({
    entrypoints: ["src/main.ts"],
    outdir: "dist",
    naming: "main.[ext]",
    plugins: [tailwind],
  });
}

async function buildMeta() {
  const { generateRobotsTxt } = await import("./src/robots.ts");
  const { generateSitemap } = await import("./src/sitemap.ts");
  const { generateManifest } = await import("./src/manifest.ts");

  await Bun.write("./dist/robots.txt", generateRobotsTxt());
  await Bun.write("./dist/sitemap.xml", generateSitemap());
  await Bun.write("./dist/manifest.json", generateManifest());
}

async function build() {
  await mkdir("./dist", { recursive: true });
  await Promise.all([buildHtml(), buildJs(), buildMeta()]);
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] 🚀 Build complete in dist/\n`);
}

if (!isDev) {
  await build();
} else {
  console.log("Starting development mode...\n");
  
  // Initial build
  await build();

  // Server (Strictly port 3000)
  const port = process.env.PORT || 3000;
  
  const { routes: appRoutes } = await import("./src/router.ts");
  const bunRoutes: Record<string, Response> = {};
  
  // Use Bun's native static route performance!
  for (const route of appRoutes) {
    let routePath = route.path.replace(/^\/+/, "");
    if (!routePath.endsWith(".html")) {
       routePath = routePath ? `${routePath}/index.html` : "index.html";
    }
    bunRoutes[route.path] = new Response(Bun.file(`./dist/${routePath}`));
  }

  const serveOptions = {
    port,
    reusePort: true,
    routes: bunRoutes,
    async fetch(req: Request) {
      const url = new URL(req.url);
      const file = Bun.file(`./dist${url.pathname}`);
      const exists = await file.exists();
      
      if (!exists) {
        if (url.pathname === "/favicon.ico") {
           return new Response("", { status: 204 });
        }
        
        // Serve 404 page for missing files
        const notFoundFile = Bun.file("./dist/404.html");
        if (await notFoundFile.exists()) {
           return new Response(notFoundFile, { status: 404, headers: { "Content-Type": "text/html" } });
        }
        return new Response("404 Not Found", { status: 404 });
      }
      
      return new Response(file);
    },
  };

  Bun.serve(serveOptions);
  console.log(`[BunForge] Server running at http://localhost:${port}`);
}
