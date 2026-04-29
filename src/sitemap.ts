import { routes } from "./router";

export function generateSitemap() {
  const baseUrl = "https://bunforge.example.com";
  
  const urls = routes
    .filter(r => !r.path.includes("404"))
    .map(r => {
      const urlPath = r.path === "/" ? "" : r.path;
      const priority = r.path === "/" ? "1.0" : "0.8";
      return `  <url>\n    <loc>${baseUrl}${urlPath}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
