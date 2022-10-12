import { isArray } from './is-array';

export function coerceArray<T>(value: T | readonly T[]): T[] {
  return isArray(value) ? [...value] : [value];
}
