import { isArray } from './util';

export function coerceArray<T>(value: T | readonly T[]): T[] {
  return isArray(value) ? value.slice() : [value];
}
