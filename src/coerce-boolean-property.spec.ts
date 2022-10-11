import { coerceBooleanProperty } from './coerce-boolean-property';

describe.concurrent('coerce-boolean-property', () => {
  it('should coerce true string', () => {
    expect(coerceBooleanProperty('true')).toBe(true);
  });

  it('should coerce false string', () => {
    expect(coerceBooleanProperty('false')).toBe(false);
  });

  it('should coerce empty string', () => {
    expect(coerceBooleanProperty('')).toBe(true);
  });

  it('should coerce null', () => {
    expect(coerceBooleanProperty(null)).toBe(false);
  });

  it('should coerce undefined', () => {
    expect(coerceBooleanProperty(undefined)).toBe(false);
  });

  it('should coerce false uppercase', () => {
    expect(coerceBooleanProperty('FALSE')).toBe(false);
  });

  it('should coerce true uppercase', () => {
    expect(coerceBooleanProperty('TRUE')).toBe(true);
  });
});
