import { isArray, isNil, isNumber } from './util';
import { BooleanInput, NumberInput } from './type';

export function coerceArray<T>(value: T | T[]): T[];
export function coerceArray<T>(value: T | readonly T[]): readonly T[];
export function coerceArray<T>(value: T | T[]): T[] {
  return isArray(value) ? value : [value];
}

export function coerceBooleanProperty(value: BooleanInput): boolean {
  return !isNil(value) && `${value}` !== 'false';
}

export function coerceNumberProperty(value: NumberInput, fallback = 0): number {
  if (isNil(value) || Number.isNaN(value)) {
    return fallback;
  }
  if (isNumber(value)) {
    return value;
  }
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}
