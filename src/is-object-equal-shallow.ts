export function isObjectEqualShallow<T extends Record<any, any>>(
  objectA: T | null | undefined,
  objectB: T | null | undefined
): boolean {
  if (objectA === objectB) {
    return true;
  }
  if (!objectA || !objectB) {
    return false;
  }
  const keysA = Object.keys(objectA);
  const keysB = Object.keys(objectB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (const key of keysA) {
    if (objectA[key] !== objectB[key]) {
      return false;
    }
  }
  return true;
}
