import { random } from './random';

export function arraySample<T>(array: readonly T[] | null | undefined): T | undefined {
  array ??= [];
  return array[random(0, array.length - 1)];
}
