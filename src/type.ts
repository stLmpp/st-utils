export type KeyType = string | number | symbol;
export type BooleanInput = string | boolean | null | undefined;
export type NumberInput = string | number | null | undefined;

export type ArrayCallback<T, R> = (item: T, index: number, array: readonly T[]) => R;
