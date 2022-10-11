import { BooleanInput } from './type';
import { isNil } from './is-nil';

export function coerceBooleanProperty(value: BooleanInput): boolean {
  return !isNil(value) && `${value}` !== 'false';
}
