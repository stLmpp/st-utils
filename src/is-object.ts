import { isNull } from './is-null';

export function isObject(value: any): value is Record<any, any> {
  return !isNull(value) && typeof value === 'object';
}
