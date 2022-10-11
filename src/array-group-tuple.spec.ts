import { arrayGroupTuple } from './array-group-tuple';
import { isOdd } from './is-odd';

describe.concurrent('array-group-tuple', () => {
  it('should group by string key', () => {
    expect(arrayGroupTuple([{ type: 'type-1' }, { type: 'type-2' }], (item) => item.type)).toEqual([
      ['type-1', [{ type: 'type-1' }]],
      ['type-2', [{ type: 'type-2' }]],
    ]);
  });

  it('should group by object key', () => {
    const odd = { type: 'odd' };
    const even = { type: 'even' };
    expect(arrayGroupTuple([1, 2, 3], (item) => (isOdd(item) ? odd : even))).toEqual([
      [odd, [2]],
      [even, [1, 3]],
    ]);
  });

  describe('undefined', () => {
    let array: { id: number }[] | undefined;

    beforeEach(() => {
      array = undefined;
    });

    it('should return null if input is undefined', () => {
      expect(arrayGroupTuple(array, (item) => item.id)).toBeNull();
    });
  });

  describe('null', () => {
    let array: { id: number }[] | null;

    beforeEach(() => {
      array = null;
    });

    it('should return null if input is null', () => {
      expect(arrayGroupTuple(array, (item) => item.id)).toBeNull();
    });
  });
});
