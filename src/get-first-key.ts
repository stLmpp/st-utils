export function getFirstKey<T extends Record<any, any>>(object: T): keyof T | undefined {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      return key;
    }
  }
  return undefined;
}
