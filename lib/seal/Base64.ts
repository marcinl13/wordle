export const Base64 = {
  encode(bytes: Uint8Array) {
    return btoa(String.fromCharCode(...bytes));
  },

  decode(str: string) {
    return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
  },
};
