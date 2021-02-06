import { isArray, isNil } from './util';

export function coerceArray<T>(value: T | T[]): T[];
export function coerceArray<T>(value: T | readonly T[]): readonly T[];
export function coerceArray<T>(value: T | T[]): T[] {
  return isArray(value) ? value : [value];
}

export function coerceBooleanProperty(value: any): boolean {
  return !isNil(value) && `${value}` !== 'false';
}
