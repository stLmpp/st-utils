import { isArray, isFunction, normalizeString } from './util';

export function arraySearch<T, K extends keyof T>(
  array: T[],
  keyOrKeysOrCallback: K | K[] | ((item: T) => T[K]),
  _term: string | null | undefined
): T[] {
  if (!_term) {
    return array;
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
