export function arrayUniq<T>(value: readonly T[] | null | undefined): T[] {
  value ??= [];
  return [...new Set(value)];
}
