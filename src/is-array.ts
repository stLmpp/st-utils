export function isArray(value: any): value is any[] | readonly any[] {
  return Array.isArray(value);
}
