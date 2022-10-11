import { isString } from './is-string';
import { isNumber } from './is-number';
import { isSymbol } from './is-symbol';

export function isKeyof<T, K extends keyof T>(value: any): value is K {
  return isString(value) || isNumber(value) || isSymbol(value);
}