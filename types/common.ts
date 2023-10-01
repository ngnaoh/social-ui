export type ObjectValues<T> = T[keyof T];

export const TokenTypes = {
  facebookToken: "facebookToken",
  instagramToken: "instagramToken",
  twitterToken: "twitterToken",
} as const;

export type TTokenType = ObjectValues<typeof TokenTypes>;
