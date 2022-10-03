import { isNil, isNumber } from './util';
import { NumberInput } from './type';

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
