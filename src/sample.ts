import { random } from './random';

export function sample<T>(array: readonly T[]): T | undefined {
  return array[random(0, array.length)];
}
