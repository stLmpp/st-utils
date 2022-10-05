/**
 * @public
 */
export function round(number: number, decimals = 2): number {
  return +number.toFixed(decimals);
}
