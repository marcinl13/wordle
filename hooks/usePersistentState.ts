import { CryptoSealer } from "@/lib/seal/CryptoSealer";
import { useCallback, useEffect, useRef, useState } from "react";

type Options<T> = {
  serialize?: (v: T) => string;
  deserialize?: (s: string) => T;
  encrypt?: boolean;
  secret?: string;
};

/**
 * A generic persistent state hook backed by localStorage.
 * - supports optional sealing if `encrypt` and `secret` are provided
 */
export default function usePersistentState<T>(
  key: string,
  initial: T | (() => T),
  options?: Options<T>,
) {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    encrypt = false,
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
          const value = encrypt
            ? await CryptoSealer.tryUnseal(raw, secret)
            : deserialize(raw);
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
  }, [key, encrypt, secret, deserialize]);

  const setPersistentState = useCallback(
    (next: T | ((prev: T) => T)) => {
      setState((prev) => {
        const value =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        (async () => {
          try {
            const toSet = encrypt
              ? await CryptoSealer.trySeal(value, secret)
              : serialize(value);
            localStorage.setItem(key, toSet);
          } catch {
            // ignore
          }
        })();
        return value;
      });
    },
    [key, serialize, encrypt, secret],
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
