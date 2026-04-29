/**
 * A highly useful utility for conditionally joining class names together.
 * Similar to clsx or tailwind-merge.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
