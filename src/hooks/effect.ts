type EffectCallback = () => void | (() => void);
const pendingEffects: Set<EffectCallback> = new Set();
let activeCleanups: Array<() => void> = [];

export function useEffect(callback: EffectCallback) {
  pendingEffects.add(callback);
}

/** Internal: Called by the router to trigger lifecycle hooks on navigation */
export function _triggerHooks() {
  // Clean up previous effects
  activeCleanups.forEach(fn => fn());
  activeCleanups = [];
  
  // Initialize new effects
  pendingEffects.forEach(effect => {
    const cleanup = effect();
    if (typeof cleanup === 'function') {
      activeCleanups.push(cleanup);
    }
  });
  
  pendingEffects.clear();
}
