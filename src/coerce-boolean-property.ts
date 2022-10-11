import { isNil } from './is-nil';
import { BooleanInput } from './type';

export function coerceBooleanProperty(value: BooleanInput): boolean {
  return !isNil(value) && `${value}`.toLowerCase() !== 'false';
}
