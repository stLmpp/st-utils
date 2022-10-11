export function isMap(value: any): value is Map<any, any> {
  return Object.prototype.toString.call(value) === '[object Map]';
}
