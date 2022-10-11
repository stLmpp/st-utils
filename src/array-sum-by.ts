import { ArrayCallback } from './type';

export function arraySumBy<T>(
  array: readonly T[] | null | undefined,
  callback: ArrayCallback<T, number | null | undefined>
): number {
  array ??= [];
  const getter: ArrayCallback<T, number> = (item, index, _array) => callback(item, index, _array) ?? 0;
  return array.reduce((acc, item, index, _array) => acc + getter(item, index, _array), 0);
}
