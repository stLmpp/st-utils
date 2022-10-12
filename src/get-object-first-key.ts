export function getObjectFirstKey<T extends Record<any, any>>(object: T): keyof T | undefined {
  return Object.keys(object)[0];
}
