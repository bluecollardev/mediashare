export type ValuesWithKeys<T extends object, K extends keyof T> = T[K] extends (...args: infer A) => unknown ? T[K] : never;
export type Values<T extends object> = ValuesWithKeys<T, keyof T>;
export type EnumLiteralsOf<T extends object> = T[keyof T];
