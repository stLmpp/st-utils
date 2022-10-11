import { isObject } from './is-object';

export function isPlainObject(value: any): value is Record<string | number | symbol, any> {
  return isObject(value) && value.constructor === Object && Object.getPrototypeOf(value) === Object.prototype;
}
