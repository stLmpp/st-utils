import { isFunction } from './is-function';

function arrayAtInternal<T>(array: readonly T[], index: number): T | undefined {
  index = Math.trunc(index);
  if (index < 0) {
    index += array.length;
  }
  return array[index];
}

export function arrayAt<T>(array: readonly T[], index: number): T | undefined {
  if (isFunction(array.at)) {
    return array.at(index);
  }
  return arrayAtInternal(array, index);
}
