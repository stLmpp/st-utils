import type { ConditionalKeys } from 'type-fest';

export function min(array: readonly number[]): number {
  return Math.min(...array);
}

export function minBy<T extends Record<any, any>, K extends ConditionalKeys<T, number>>(array: readonly T[], key: K): T {
  return array.reduce((acc, item) => (item[key] < acc[key] ? item : acc), array[0]);
}
