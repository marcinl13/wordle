import Cookies from "js-cookie";
import { CryptoSealer } from "@/lib/seal/CryptoSealer";
import { useCallback, useEffect, useState } from "react";

type Options<T> = {
  serialize?: (v: T) => string;
  deserialize?: (s: string) => T;
  secret?: string;
  cookieOptions?: (typeof Cookies)["attributes"];
};

/**
 * Persistent state stored in a cookie. If `secret` is provided the value is
 * sealed using `CryptoSealer` before being written to the cookie.
 */
export default function useCookieSealedState<T>(
  key: string,
  initial: T | (() => T),
  options?: Options<T>,
) {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    secret,
    cookieOptions,
  } = options || {};

  const [state, setState] = useState<T>(() =>
    typeof initial === "function" ? (initial as () => T)() : initial,
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const raw = Cookies.get(key);
        if (raw != null) {
          const value = secret
            ? await CryptoSealer.tryUnseal(raw, secret)
            : deserialize(raw);
          if (!cancelled && value !== undefined) setState(value as T);
        }
      } catch {
        // ignore
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [key, secret, deserialize]);

  const setPersistentState = useCallback(
    (next: T | ((prev: T) => T)) => {
      setState((prev) => {
        const value =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        (async () => {
          try {
            const toSet = secret
              ? await CryptoSealer.trySeal(value, secret)
              : serialize(value);
            Cookies.set(key, toSet, cookieOptions);
          } catch {
            // ignore
          }
        })();
        return value;
      });
    },
    [key, serialize, secret, cookieOptions],
  );

  const reset = useCallback(() => {
    try {
      Cookies.remove(key);
    } catch {
      // ignore
    }
    setState(typeof initial === "function" ? (initial as () => T)() : initial);
  }, [key, initial]);

  return [state, setPersistentState, reset] as const;
}
