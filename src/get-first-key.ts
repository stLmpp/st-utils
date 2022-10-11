export function getFirstKey<T extends Record<any, any>>(object: T): keyof T | undefined {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      return key;
    }
  }
  return undefined;
}
