export function arrayRotate<T>(array: T[], rotations: number): T[] {
  return array.slice(rotations, array.length).concat(array.slice(0, rotations));
}
