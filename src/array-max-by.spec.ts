import { arrayMaxBy } from './array-max-by';

describe.concurrent('array-max-by', () => {
  it('should return the max item of the array base on a callback', () => {
    expect(arrayMaxBy([{ value: 1 }, { value: 2 }, { value: -1 }], (item) => item.value)).toEqual({ value: 2 });
  });

  it('should return null when array is null', () => {
    expect(arrayMaxBy(null, () => 0)).toBeNull();
  });

  it('should return null when array is undefined', () => {
    expect(arrayMaxBy(null, () => 0)).toBeNull();
  });

  it('should return null if array is empty', () => {
    expect(arrayMaxBy([], () => 0)).toBeNull();
  });
});
