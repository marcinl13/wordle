import { useCallback, useEffect, useRef, useState } from "react";

type Options<T> = {
  serialize?: (v: T) => string;
  deserialize?: (s: string) => T;
};

/**
 * Persistent state hook backed by plain localStorage (no sealing/encryption).
 */
export default function useLocalStorageState<T>(
  key: string,
  initial: T | (() => T),
  options?: Options<T>,
) {
  const { serialize = JSON.stringify, deserialize = JSON.parse } = options || {};

  const [state, setState] = useState<T>(() =>
    typeof initial === "function" ? (initial as () => T)() : initial,
  );
  const mountedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const raw = localStorage.getItem(key);
        if (raw != null) {
          const value = deserialize(raw);
          if (!cancelled && value !== undefined) setState(value as T);
        }
      } catch {
        // ignore
      }
    })();

    mountedRef.current = true;
    return () => {
      cancelled = true;
      mountedRef.current = false;
    };
  }, [key, deserialize]);

  const setPersistentState = useCallback(
    (next: T | ((prev: T) => T)) => {
      setState((prev) => {
        const value =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        (async () => {
          try {
            const toSet = serialize(value);
            localStorage.setItem(key, toSet);
          } catch {
            // ignore
          }
        })();
        return value;
      });
    },
    [key, serialize],
  );

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setState(typeof initial === "function" ? (initial as () => T)() : initial);
  }, [key, initial]);

  return [state, setPersistentState, reset] as const;
}
