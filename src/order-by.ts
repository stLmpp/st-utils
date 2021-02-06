import sort from 'fast-sort';
import { isArray, isFunction, isKeyof, isNil } from './util';

export type OrderByType<T, K extends keyof T = keyof T> =
  | K[]
  | K
  | ((value: T) => any)
  | ((value: T) => any)[]
  | Record<K, OrderByDirection>;

export type OrderByDirection = 'asc' | 'desc';

export function orderBy<T>(array: T[], key: keyof T, order?: OrderByDirection): T[];
export function orderBy<T>(array: T[], keys: (keyof T)[], order?: OrderByDirection): T[];
export function orderBy<T>(array: T[], getter: (value: T) => any): T[];
export function orderBy<T>(array: T[], getters: ((value: T) => any)[]): T[];
export function orderBy<T, K extends keyof T>(values: T[], commands: Record<K, OrderByDirection>): T[];
export function orderBy<T>(values: T[], keyOrCommand?: OrderByType<T>, order?: OrderByDirection): T[];
export function orderBy<T>(values: T[]): T[];
export function orderBy<T, K extends keyof T>(
  values: T[],
  keyOrCommand?: OrderByType<T>,
  order: OrderByDirection = 'asc'
): T[] {
  values = [...values];
  if (isNil(keyOrCommand)) {
    return sort(values)[order]();
  } else if (isKeyof<T, K>(keyOrCommand)) {
    return sort(values)[order](keyOrCommand);
  } else if (isArray(keyOrCommand)) {
    return sort(values)[order](keyOrCommand);
  } else if (isFunction(keyOrCommand)) {
    return sort(values)[order](keyOrCommand);
  } else {
    const commands = keyOrCommand as Record<K, OrderByDirection>;
    const commandsEntries = Object.entries(commands) as [K, OrderByDirection][];
    const commandsArray = commandsEntries.map(([key, value]) => ({ [value]: key })) as Record<OrderByDirection, K>[];
    return sort(values).by(commandsArray);
  }
}
