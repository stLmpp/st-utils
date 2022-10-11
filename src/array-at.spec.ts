import { arrayAt } from './array-at';

describe.concurrent('array-at', () => {
  it('should get from valid index', () => {
    expect(arrayAt([1, 2, 3], 1)).toBe(2);
  });

  it('should get undefined from invalid index', () => {
    expect(arrayAt([1, 2, 3], 999)).toBeUndefined();
  });

  it('should get from negative index', () => {
    expect(arrayAt([1, 2, 3], -2)).toBe(2);
  });

  it('should trunc decimal number', () => {
    expect(arrayAt([1, 2, 3], 0.1)).toBe(1);
  });
});
