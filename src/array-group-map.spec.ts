import { arrayGroupMap } from './array-group-map';
import { isOdd } from './is-odd';

describe.concurrent('array-group-map', () => {
  it('should group by string key', () => {
    expect(arrayGroupMap([{ type: 'type-1' }, { type: 'type-2' }], (item) => item.type)).toEqual(
      new Map().set('type-1', [{ type: 'type-1' }]).set('type-2', [{ type: 'type-2' }])
    );
  });

  it('should group by object key', () => {
    const odd = { type: 'odd' };
    const even = { type: 'even' };
    expect(arrayGroupMap([1, 2, 3], (item) => (isOdd(item) ? odd : even))).toEqual(
      new Map().set(odd, [2]).set(even, [1, 3])
    );
  });

  describe('undefined', () => {
    let array: { id: number }[] | undefined;

    beforeEach(() => {
      array = undefined;
    });

    it('should return null if input is undefined', () => {
      expect(arrayGroupMap(array, (item) => item.id)).toBeNull();
    });
  });

  describe('null', () => {
    let array: { id: number }[] | null;

    beforeEach(() => {
      array = null;
    });

    it('should return null if input is null', () => {
      expect(arrayGroupMap(array, (item) => item.id)).toBeNull();
    });
  });
});
