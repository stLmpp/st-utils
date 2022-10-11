import { isOdd } from './is-odd';

export function isEven(num: number): boolean {
  return !isOdd(num);
}
