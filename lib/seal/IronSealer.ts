import Iron from "@hapi/iron";

export const IronSealer = {
  async tryUnseal(raw: string, secret?: string) {
    if (!secret) return JSON.parse(raw);
    try {
      return await Iron.unseal(raw, secret, Iron.defaults);
    } catch (e) {
      // fallback to plain JSON if unsealing fails
      try {
        return JSON.parse(raw);
      } catch {
        return undefined;
      }
    }
  },
  async trySeal(value: unknown, secret?: string) {
    if (!secret) return JSON.stringify(value);
    try {
      return await Iron.seal(value, secret, Iron.defaults);
    } catch (e) {
      // fallback to plain JSON on error
      return JSON.stringify(value);
    }
  },
};
