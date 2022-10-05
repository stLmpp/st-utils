/**
 * @public
 */
export function arrayRotate<T>(array: readonly T[], rotations: number): T[] {
  return array.slice(rotations, array.length).concat(array.slice(0, rotations));
}
