import { arrayGroup } from './array-group';

describe.concurrent('array-group', () => {
  it('should group by string key', () => {
    expect(arrayGroup([{ type: 'type-1' }, { type: 'type-2' }], (item) => item.type)).toEqual({
      'type-1': [{ type: 'type-1' }],
      'type-2': [{ type: 'type-2' }],
    });
  });

  it('should group by number key', () => {
    expect(arrayGroup([{ id: 1 }, { id: 2 }], (item) => item.id)).toEqual({
      1: [{ id: 1 }],
      2: [{ id: 2 }],
    });
  });

  it('should group by symbol key', () => {
    const symbolA = Symbol();
    const symbolB = Symbol();
    expect(arrayGroup([{ id: symbolA }, { id: symbolB }], (item) => item.id)).toEqual({
      [symbolA]: [{ id: symbolA }],
      [symbolB]: [{ id: symbolB }],
    });
  });

  describe('undefined', () => {
    let array: { id: number }[] | undefined;

    beforeEach(() => {
      array = undefined;
    });

    it('should return null if input is undefined', () => {
      expect(arrayGroup(array, (item) => item.id)).toBeNull();
    });
  });

  describe('null', () => {
    let array: { id: number }[] | null;

    beforeEach(() => {
      array = null;
    });

    it('should return null if input is null', () => {
      expect(arrayGroup(array, (item) => item.id)).toBeNull();
    });
  });
});
