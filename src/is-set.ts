export function isSet(value: any): value is Set<any> {
  return Object.prototype.toString.call(value) === '[object Set]';
}
