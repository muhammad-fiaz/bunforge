export function useRef<T>(initialValue: T): { current: T } {
  return { current: initialValue };
}
