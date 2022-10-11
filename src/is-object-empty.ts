export function isObjectEmpty(value: Record<any, any>): boolean {
  return !Object.keys(value).length;
}
