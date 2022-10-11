import { arrayAt } from './array-at';

describe.concurrent('array-at', () => {
  const originalAt = Array.prototype.at;

  describe('array-at-internal', () => {
    beforeAll(() => {
      (Array.prototype as any).at = null;
    });

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

  describe('array-at-original', () => {
    beforeAll(() => {
      Array.prototype.at = originalAt;
    });

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
});
