import { coerceArray } from './coerce-array';

describe.concurrent('coerce-array', () => {
  it('should coerce from non-array', () => {
    expect(coerceArray({})).toEqual([{}]);
  });

  it('should coerce from array', () => {
    expect(coerceArray([{}])).toEqual([{}]);
  });
});
