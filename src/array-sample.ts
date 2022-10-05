import { random } from './random';

/**
 * @public
 */
export function arraySample<T>(array: readonly T[]): T {
  return array[random(0, array.length - 1)];
}
