import { CryptoSealer } from "@/lib/seal/CryptoSealer";
import { useCallback, useEffect, useRef, useState } from "react";

type Options<T> = {
  serialize?: (v: T) => string;
  deserialize?: (s: string) => T;
  secret?: string;
};

/**
 * Persistent state hook that stores a sealed (encrypted) value in localStorage.
 * If `secret` is not provided the value will be stored as plain JSON (compat).
 */
export default function useLocalStorageSealedState<T>(
  key: string,
  initial: T | (() => T),
  options?: Options<T>,
) {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    secret,
  } = options || {};

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
          const value = await CryptoSealer.tryUnseal(raw, secret);
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
  }, [key, secret, deserialize]);

  const setPersistentState = useCallback(
    (next: T | ((prev: T) => T)) => {
      setState((prev) => {
        const value =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        (async () => {
          try {
            const toSet = await CryptoSealer.trySeal(value, secret);
            localStorage.setItem(key, toSet);
          } catch {
            // ignore
          }
        })();
        return value;
      });
    },
    [key, serialize, secret],
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
