import { random } from './random';

export function sample<T>(array: T[]): T | undefined {
  return array[random(0, array.length)];
}
