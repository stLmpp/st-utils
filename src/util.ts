/**
 * @public
 */
export function isObjectEmpty(value: Record<any, any>): boolean {
  return !Object.keys(value).length;
}

/**
 * @public
 */
export function isString(value: any): value is string {
  return typeof value === 'string';
}

/**
 * @public
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

/**
 * @public
 */
export function isArray(value: any): value is any[] | readonly any[] {
  return Array.isArray(value);
}

/**
 * @public
 */
export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function';
}

/**
 * @public
 */
export function isObject(value: any): value is Record<any, any> {
  return !isNull(value) && typeof value === 'object';
}

/**
 * @public
 */
export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined';
}

/**
 * @public
 */
export function isNull(value: any): value is null {
  return value === null;
}

/**
 * @public
 */
export function isNil(value: any): value is null | undefined {
  return value == null;
}

/**
 * @public
 */
export function isNotNil<T>(value: T): value is NonNullable<T> {
  return !isNil(value);
}

/**
 * @public
 */
export function isDate(value: any): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]';
}

/**
 * @public
 */
export function isRegExp(value: any): value is RegExp {
  return Object.prototype.toString.call(value) === '[object RegExp]';
}

/**
 * @public
 */
export function isSymbol(value: any): value is symbol {
  return typeof value === 'symbol';
}

/**
 * @public
 */
export function isKeyof<T, K extends keyof T>(value: any): value is K {
  return isString(value) || isNumber(value) || isSymbol(value);
}

/**
 * @public
 */
export function isSet(value: any): value is Set<any> {
  return Object.prototype.toString.call(value) === '[object Set]';
}

/**
 * @public
 */
export function isMap(value: any): value is Map<any, any> {
  return Object.prototype.toString.call(value) === '[object Map]';
}

/**
 * @public
 */
export function normalizeString(str: any): string {
  return (str ?? '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * @public
 */
export function isObjectEqualShallow<T extends Record<any, any>>(
  objectA: T | null | undefined,
  objectB: T | null | undefined
): boolean {
  if (objectA === objectB) {
    return true;
  }
  if (!objectA || !objectB) {
    return false;
  }
  const keysA = Object.keys(objectA);
  const keysB = Object.keys(objectB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (const key of keysA) {
    if (objectA[key] !== objectB[key]) {
      return false;
    }
  }
  return true;
}

/**
 * @public
 */
export function getFirstKey<T extends Record<any, any>>(
  object: T
): keyof T | undefined {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      return key;
    }
  }
  return undefined;
}

/**
 * @public
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

/**
 * @public
 */
export function isPlainObject(
  value: any
): value is Record<string | number | symbol, any> {
  return (
    isObject(value) &&
    value.constructor === Object &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

/**
 * @public
 */
export function isIterable<T>(value: any): value is Iterable<T> {
  return !isNull(value) && isFunction(value[Symbol.iterator]);
}
