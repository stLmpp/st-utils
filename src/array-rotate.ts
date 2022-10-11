export function arrayRotate<T>(array: readonly T[] | null | undefined, rotations: number): T[] {
  array ??= [];
  return array.slice(rotations, array.length).concat(array.slice(0, rotations));
}
