import type { ConditionalKeys } from 'type-fest';

export function max(array: number[]): number {
  return Math.max(...array);
}

export function maxBy<T extends Record<any, any>, K extends ConditionalKeys<T, number>>(array: T[], key: K): T {
  return array.reduce((acc, item) => (item[key] > acc[key] ? item : acc), array[0]);
}
