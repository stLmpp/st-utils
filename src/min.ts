import type { ConditionalKeys } from 'type-fest';

export function minBy<T extends Record<any, any>, K extends ConditionalKeys<T, number>>(array: T[], key: K): T {
  return array.reduce((acc, item) => (item[key] < acc ? item : acc), array[0]);
}
