export function useState<T>(initialValue: T) {
  let state = initialValue;
  const listeners = new Set<(v: T) => void>();
  
  const get = () => state;
  const set = (newValue: T) => {
    if (state !== newValue) {
      state = newValue;
      listeners.forEach(l => l(state));
    }
  };
  
  const subscribe = (listener: (v: T) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener); // unsubscribe
  };
  
  return [get, set, subscribe] as const;
}
