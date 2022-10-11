import { coerceArray } from './coerce-array';

describe('coerce-array', () => {
  it('should coerce from non-array', () => {
    expect(coerceArray({})).toEqual([{}]);
  });
});
