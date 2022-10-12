export function arrayUniqWith<T>(
  array: readonly T[] | null | undefined,
  comparator: (valueA: T, valueB: T) => unknown
): T[] {
  array ??= [];
  const set = new Set<number>();
  const len = array.length;
  for (let indexA = 0; indexA < len; indexA++) {
    for (let indexB = indexA + 1; indexB < len; indexB++) {
      const valueA = array[indexA];
      const valueB = array[indexB];
      if (comparator(valueA, valueB)) {
        set.add(indexA);
        break;
      }
    }
  }
  return array.filter((_, index) => !set.has(index));
}
