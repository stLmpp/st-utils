import { isFunction } from './util';

function arrayAtInternal<T>(array: readonly T[], index: number): T | undefined {
  index = Math.trunc(index) || 0;
  if (index < 0) {
    index += array.length;
  }
  return array[index];
}

/**
 * @public
 */
export function arrayAt<T>(array: readonly T[], index: number): T | undefined {
  if (isFunction(Array.prototype.at)) {
    return array.at(index);
  }
  return arrayAtInternal(array, index);
}
