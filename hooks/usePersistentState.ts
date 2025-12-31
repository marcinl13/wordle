import useLocalStorageState from "./useLocalStorageState";
import useLocalStorageSealedState from "./useLocalStorageSealedState";

type Options<T> = {
  serialize?: (v: T) => string;
  deserialize?: (s: string) => T;
  encrypt?: boolean;
  secret?: string;
};

/**
 * Backwards-compatible hook that delegates to either plain localStorage or
 * sealed storage depending on the `encrypt` option.
 */
export default function usePersistentState<T>(
  key: string,
  initial: T | (() => T),
  options?: Options<T>,
) {
  const { encrypt = false, secret, ...rest } = options || {};

  if (encrypt) {
    return useLocalStorageSealedState<T>(key, initial, { ...(rest as any), secret });
  }

  return useLocalStorageState<T>(key, initial, rest as any);
}
