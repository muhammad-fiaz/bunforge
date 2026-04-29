export function generateManifest() {
  return JSON.stringify({
    name: "BunForge",
    short_name: "BunForge",
    description: "A minimal, modern static website starter powered by Bun.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/icon-192.png",
        type: "image/png",
        sizes: "192x192"
      },
      {
        src: "/icon-512.png",
        type: "image/png",
        sizes: "512x512"
      }
    ]
  }, null, 2);
}
