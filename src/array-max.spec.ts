import { arrayMax } from './array-max';

describe.concurrent('array-max', () => {
  it('should return max in array of numbers', () => {
    expect(arrayMax([2, 3, 1, 4, 2])).toBe(4);
  });

  it('should return negative Infinity when array is null', () => {
    expect(arrayMax(null)).toBe(-Infinity);
  });

  it('should return negative Infinity when array is undefined', () => {
    expect(arrayMax(undefined)).toBe(-Infinity);
  });

  it('should return negative Infinity when array is empty', () => {
    expect(arrayMax([])).toBe(-Infinity);
  });
});
