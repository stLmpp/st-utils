import { ConditionalKeys } from 'type-fest';

export function arrayMaxBy<T extends Record<any, any>, K extends ConditionalKeys<T, number>>(
  array: readonly T[],
  key: K
): T {
  return array.reduce((acc, item) => (item[key] > acc[key] ? item : acc), array[0]);
}
