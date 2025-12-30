const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const ITERATIONS = 100_000;
const KDF_ALGORITHM = "PBKDF2" as const;
const CIPHER_ALGORITHM = "AES-GCM" as const;
const HASH_ALGORITHM = "SHA-256" as const;
const SALT = "crypto-sealer-v1";

async function deriveKey(secret: string) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    KDF_ALGORITHM,
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: KDF_ALGORITHM,
      salt: textEncoder.encode(SALT),
      iterations: ITERATIONS,
      hash: HASH_ALGORITHM,
    },
    baseKey,
    { name: CIPHER_ALGORITHM, length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

function base64Encode(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes));
}

function base64Decode(str: string) {
  return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
}

export const CryptoSealer = {
  async trySeal(value: unknown, secret?: string) {
    const raw = JSON.stringify(value);
    if (!secret) return raw;

    try {
      const key = await deriveKey(secret);
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const plaintext = textEncoder.encode(raw);

      const encrypted = await crypto.subtle.encrypt(
        { name: CIPHER_ALGORITHM, iv },
        key,
        plaintext,
      );

      return JSON.stringify({
        iv: base64Encode(iv),
        data: base64Encode(new Uint8Array(encrypted)),
      });
    } catch {
      return raw;
    }
  },

  async tryUnseal(raw: string, secret?: string) {
    if (!secret) {
      try {
        return JSON.parse(raw);
      } catch {
        return undefined;
      }
    }

    try {
      const parsed = JSON.parse(raw);
      if (!parsed?.iv || !parsed?.data) throw new Error();

      const key = await deriveKey(secret);
      const iv = base64Decode(parsed.iv);
      const data = base64Decode(parsed.data);

      const decrypted = await crypto.subtle.decrypt(
        { name: CIPHER_ALGORITHM, iv },
        key,
        data,
      );

      return JSON.parse(textDecoder.decode(decrypted));
    } catch {
      try {
        return JSON.parse(raw);
      } catch {
        return undefined;
      }
    }
  },
};
