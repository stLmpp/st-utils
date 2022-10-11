import { isArray } from './is-array';
import { normalizeString } from './normalize-string';
import { ArrayCallback } from './type';

export function arraySearch<T>(
  array: readonly T[] | null | undefined,
  callbackOrCallbacks: ArrayCallback<T, unknown> | ArrayCallback<T, unknown>[],
  term: string | null | undefined
): T[] {
  if (!term || !array) {
    array ??= [];
    return [...array];
  }
  const normalizedTerm = normalizeString(term).toLowerCase();
  let predicate: ArrayCallback<T, boolean>;
  if (isArray(callbackOrCallbacks)) {
    predicate = (entity, index, _array) =>
      callbackOrCallbacks.some((callback) =>
        normalizeString(callback(entity, index, _array)).toLowerCase().includes(normalizedTerm)
      );
  } else {
    predicate = (entity, index, _array) =>
      normalizeString(callbackOrCallbacks(entity, index, _array)).toLowerCase().includes(normalizedTerm);
  }
  return array.filter(predicate);
}
