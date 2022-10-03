import { random } from './random';

export function arraySample<T>(array: readonly T[]): T {
  return array[random(0, array.length - 1)];
}
