export function isObjectEmpty(value: Record<any, any>): boolean {
  return !Object.keys(value).length;
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export function isObject(value: any): value is Record<any, any> {
  return !isNull(value) && typeof value === 'object';
}

export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined';
}

export function isNull(value: any): value is null {
  return value === null;
}

export function isNil(value: any): value is null | undefined {
  return value == null;
}

export function isDate(value: any): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]';
}

export function isRegExp(value: any): value is RegExp {
  return Object.prototype.toString.call(value) === '[object RegExp]';
}

export function isSymbol(value: any): value is symbol {
  return Object.prototype.toString.call(value) === '[object Symbol]';
}

export function isKeyof<T, K extends keyof T>(value: any): value is K {
  return isString(value) || isNumber(value) || isSymbol(value);
}

export function isSet(value: any): value is Set<any> {
  return Object.prototype.toString.call(value) === '[object Set]';
}

export function isMap(value: any): value is Map<any, any> {
  return Object.prototype.toString.call(value) === '[object Map]';
}

export function normalizeString(str: string): string {
  return (str ?? '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
