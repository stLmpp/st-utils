import { isNil } from './is-nil';

export function isNotNil<T>(value: T): value is NonNullable<T> {
  return !isNil(value);
}
