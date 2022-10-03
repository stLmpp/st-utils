import { BooleanInput } from './type';
import { isNil } from './util';

export function coerceBooleanProperty(value: BooleanInput): boolean {
  return !isNil(value) && `${value}` !== 'false';
}
