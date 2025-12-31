import useLocalStorageState from "./useLocalStorageState";
import useLocalStorageSealedState from "./useLocalStorageSealedState";
import useCookieSealedState from "./useCookieSealedState";

type Options<T> = {
  serialize?: (v: T) => string;
  deserialize?: (s: string) => T;
  encrypt?: boolean;
  secret?: string;
  // When true, persist to cookie instead of localStorage. Defaults to false.
  useCookies?: boolean;
  // When using cookies, expire at next UTC midnight (default true). If false,
  // cookies will be session cookies unless `expires` is provided.
  cookieExpireAtNextUtcMidnight?: boolean;
  // Optional specific expiration Date for cookies (overrides cookieExpireAtNextUtcMidnight)
  cookieExpires?: Date;
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
  const {
    encrypt = false,
    secret,
    useCookies = false,
    cookieExpireAtNextUtcMidnight = true,
    cookieExpires,
    ...rest
  } = options || {};

  // If cookies are requested, persist to cookies. Use `useCookieSealedState`
  // for both sealed and plain storage (it falls back to plain JSON when
  // `secret` is not provided).
  if (useCookies) {
    // compute cookie options
    const cookieOptions = {} as any;
    if (cookieExpires) {
      cookieOptions.expires = cookieExpires;
    } else if (cookieExpireAtNextUtcMidnight) {
      const now = new Date();
      const nextUtcMidnight = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() + 1,
          0,
          0,
          0,
        ),
      );
      cookieOptions.expires = nextUtcMidnight;
    }

    return useCookieSealedState<T>(key, initial, {
      ...(rest as any),
      secret: encrypt ? secret : undefined,
      cookieOptions,
    });
  }

  if (encrypt) {
    return useLocalStorageSealedState<T>(key, initial, {
      ...(rest as any),
      secret,
    });
  }

  return useLocalStorageState<T>(key, initial, rest as any);
}
