import { BooleanInput } from './type';
import { isNil } from './util';

/**
 * @public
 */
export function coerceBooleanProperty(value: BooleanInput): boolean {
  return !isNil(value) && `${value}` !== 'false';
}
