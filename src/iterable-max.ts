import { isNil } from './util';

/**
 * @public
 */
export function iterableMax(
  iterable: Iterable<number> | null | undefined
): number {
  if (isNil(iterable)) {
    return 0;
  }
  return Math.max(...iterable);
}
