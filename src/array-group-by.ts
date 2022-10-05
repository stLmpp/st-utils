import type { ConditionalKeys } from 'type-fest';
import type { KeyType } from './type';

export type GroupedReturnType = 'tuple' | 'map' | 'object';
export type GroupedTuple<
  T extends Record<any, any> = Record<any, any>,
  K extends keyof T = keyof T
> = [T[K], T[]][];
export type GroupedMap<
  T extends Record<any, any> = Record<any, any>,
  K extends keyof T = keyof T
> = Map<T[K], T[]>;
export type GroupedObject<
  T extends Record<any, any>,
  K extends ConditionalKeys<T, KeyType>
> = Record<T[K], T[]>;

function groupByMap<
  T extends Record<any, any> = Record<any, any>,
  K extends keyof T = keyof T
>(array: readonly T[], key: K): GroupedMap<T, K> {
  const map = new Map<T[K], T[]>();
  for (const item of array) {
    const itemKey = item[key];
    map.set(itemKey, [...(map.get(itemKey) ?? []), item]);
  }
  return map;
}

function groupByTuple<
  T extends Record<any, any> = Record<any, any>,
  K extends keyof T = keyof T
>(array: readonly T[], key: K): GroupedTuple {
  return [...groupByMap(array, key)];
}

function groupByObject<
  T extends Record<any, any>,
  K extends ConditionalKeys<T, KeyType>
>(array: readonly T[], key: K): GroupedObject<T, K> {
  const grouped: Record<any, any> = {};
  for (const item of array) {
    const itemKey = item[key];
    grouped[itemKey] = [...(grouped[itemKey] ?? []), item];
  }
  return grouped as GroupedObject<T, K>;
}

/**
 * @public
 */
export function arrayGroupBy<
  T extends Record<any, any> = Record<any, any>,
  K extends keyof T = keyof T
>(array: readonly T[], key: K): GroupedTuple<T, K>;
export function arrayGroupBy<
  T extends Record<any, any> = Record<any, any>,
  K extends keyof T = keyof T
>(array: readonly T[], key: K, returnType: 'tuple'): GroupedTuple<T, K>;
export function arrayGroupBy<
  T extends Record<any, any> = Record<any, any>,
  K extends keyof T = keyof T
>(array: readonly T[], key: K, returnType: 'map'): GroupedMap<T, K>;
export function arrayGroupBy<
  T extends Record<any, any>,
  K extends ConditionalKeys<T, KeyType>
>(array: readonly T[], key: K, returnType: 'object'): GroupedObject<T, K>;
export function arrayGroupBy(
  array: readonly any[],
  key: any,
  returnType?: GroupedReturnType
): GroupedTuple | GroupedMap | GroupedObject<any, any> {
  switch (returnType) {
    case 'map':
      return groupByMap(array, key);
    case 'object':
      return groupByObject(array, key);
    default:
      return groupByTuple(array, key);
  }
}
