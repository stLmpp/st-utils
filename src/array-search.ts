import { isArray } from './is-array';
import { isFunction } from './is-function';
import { normalizeString } from './normalize-string';

export function arraySearch<T, K extends keyof T>(
  array: readonly T[],
  keyOrKeysOrCallback: K | readonly K[] | ((item: T) => T[K]),
  _term: string | null | undefined
): T[] {
  if (!_term) {
    return array.slice();
  }
  let predicate: (entity: T) => boolean;
  const term = normalizeString(_term).toLowerCase();
  if (isFunction(keyOrKeysOrCallback)) {
    predicate = entity => normalizeString(keyOrKeysOrCallback(entity)).toLowerCase().includes(term);
  } else if (isArray(keyOrKeysOrCallback)) {
    predicate = entity => keyOrKeysOrCallback.some(key => normalizeString(entity[key]).toLowerCase().includes(term));
  } else {
    predicate = entity => normalizeString(entity[keyOrKeysOrCallback]).toLowerCase().includes(term);
  }
  return array.filter(predicate);
}
