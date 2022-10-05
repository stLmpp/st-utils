import { isArray } from './util';

/**
 * @public
 */
export function coerceArray<T>(value: T | readonly T[]): T[] {
  return isArray(value) ? value.slice() : [value];
}
