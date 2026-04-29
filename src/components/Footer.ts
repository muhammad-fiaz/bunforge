export function Footer() {
  const currentYear = new Date().getFullYear();
  return `
    <footer class="border-t border-bdr py-8 mt-auto w-full text-center text-muted text-sm">
      &copy; ${currentYear} BunForge. Built with Bun & Tailwind v4.
    </footer>
  `;
}
