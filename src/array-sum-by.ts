import { ConditionalKeys } from 'type-fest';

/**
 * @public
 */
export function arraySumBy<
  T extends Record<any, any>,
  K extends ConditionalKeys<T, number | null | undefined>
>(array: readonly T[], key: K): number {
  return array.reduce((acc, item) => acc + (item[key] ?? 0), 0);
}
