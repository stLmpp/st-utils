import { isArray, isFunction } from './util';
import { coerceArray } from './coersion';
import { orderBy, OrderByDirection, OrderByType } from './order-by';
import { uniqBy, uniqWith } from './uniq';
import { sample } from './sample';
import { arrayAt } from './array-at';
import { arrayRemove } from './array-remove';

export type IdKeyType = number | string;
export type IdGetterFn<T extends Record<any, any>> = (entity: T) => IdKeyType;
export type IdGetter<T extends Record<any, any>, K extends keyof T> = K | IdGetterFn<T>;

/**
 * @description used to parse an IdGetter (keyof or predicate)
 * @param getter
 */
export function parseIdGetter<T extends Record<any, any>, K extends keyof T>(getter: IdGetter<T, K>): IdGetterFn<T> {
  if (isFunction(getter)) {
    return getter;
  } else {
    return entity => entity[getter];
  }
}

export type ArrayUtilPredicate<T extends Record<any, any>> = (entity: T, index: number, array: T[]) => boolean;
export type ArrayUtilUpdate<T extends Record<any, any>> = (entity: T, index: number, array: T[]) => T;

/**
 * @description a set of utilities to modify arrays of object with immutability
 */
export class ArrayUtil<T extends Record<any, any>, K extends keyof T = keyof T> {
  constructor(private array: T[], idGetter: IdGetter<T, K>) {
    this._idGetter = parseIdGetter(idGetter);
  }

  private readonly _idGetter: IdGetterFn<T>;

  private _upsertOne(id: IdKeyType, partial: T | Partial<T>): this {
    const itemIndex = this.array.findIndex(item => this._idGetter(item) === id);
    if (itemIndex === -1) {
      return this.append({ ...(partial as T) });
    } else {
      return this.update(id, partial);
    }
  }

  private _upsertMany(items: (T | Partial<T>)[]): this {
    for (const item of items) {
      const id = this._idGetter(item as T);
      const itemIndex = this.array.findIndex(itemArr => this._idGetter(itemArr) === id);
      if (itemIndex === -1) {
        this.append(item as T);
      } else {
        this.update(id, item);
      }
    }
    return this;
  }

  /**
   * @description get the array
   */
  get(): T[] {
    return this.array;
  }

  /**
   * @description get one based on the id
   * @param id
   */
  getOne(id: IdKeyType): T | undefined {
    return this.array.find(item => this._idGetter(item) === id);
  }

  /**
   * @description try to get one based on the id, if not found throw an error
   * @param id
   */
  getOneOrFail(id: IdKeyType): T {
    const itemIndex = this.array.findIndex(item => this._idGetter(item) === id);
    if (itemIndex === -1) {
      throw new Error(`Item not found with id ${id.toString()}`);
    }
    return this.array[itemIndex];
  }

  /**
   * @description get many items based on ids
   * @param ids
   */
  getMany(ids: IdKeyType[]): T[] {
    return this.array.filter(item => ids.includes(this._idGetter(item)));
  }

  /**
   * @description update an item or itens, based on a predicate and a update (partial type or callback)
   * @param idOrPredicate
   * @param partialOrCallback
   */
  update(
    idOrPredicate: IdKeyType | IdKeyType[] | ArrayUtilPredicate<T>,
    partialOrCallback: T | Partial<T> | ArrayUtilUpdate<T>
  ): this {
    let predicate: ArrayUtilPredicate<T>;
    if (isFunction(idOrPredicate)) {
      predicate = idOrPredicate;
    } else if (isArray(idOrPredicate)) {
      predicate = entity => idOrPredicate.includes(this._idGetter(entity));
    } else {
      predicate = entity => this._idGetter(entity) === idOrPredicate;
    }
    const update: ArrayUtilUpdate<T> = isFunction(partialOrCallback)
      ? partialOrCallback
      : entity => ({ ...entity, ...partialOrCallback });
    this.array = this.array.map((item, index, array) => {
      if (predicate(item, index, array)) {
        item = update(item, index, array);
      }
      return item;
    });
    return this;
  }

  /**
   * @description used to upsert items in the array
   * ** if using multiple items to upsert, make sure the id or ids are set in the array **
   * @param idOrItems
   * @param partial
   */
  upsert(idOrItems: IdKeyType | (T | Partial<T>)[], partial?: T | Partial<T>): this {
    if (isArray(idOrItems)) {
      this._upsertMany(idOrItems);
    } else if (partial) {
      this._upsertOne(idOrItems, partial);
    }
    return this;
  }

  /**
   * @description add item to end of array
   * @param item
   */
  append(item: T): this {
    this.array = [...this.array, item];
    return this;
  }

  /**
   * @description add item to start of array
   * @param item
   */
  prepend(item: T): this {
    this.array = [item, ...this.array];
    return this;
  }

  /**
   * @description insert item to specified index of array
   * @param item
   * @param index
   */
  insert(item: T | T[], index: number): this {
    const itens = coerceArray(item);
    this.array = [...this.array.slice(0, index), ...itens, ...this.array.slice(index)];
    return this;
  }

  /**
   * @description remove item or itens of the array, based on the id, ids or predicate
   * @param idOrPredicate
   */
  remove(idOrPredicate: IdKeyType | IdKeyType[] | ArrayUtilPredicate<T>): this {
    let predicate: ArrayUtilPredicate<T>;
    if (isFunction(idOrPredicate)) {
      predicate = idOrPredicate;
    } else if (isArray(idOrPredicate)) {
      predicate = entity => idOrPredicate.includes(this._idGetter(entity));
    } else {
      predicate = entity => this._idGetter(entity) === idOrPredicate;
    }
    this.array = arrayRemove(this.array, predicate);
    return this;
  }

  /**
   * @description remove item or itens based in the index/indices
   * @param index
   */
  removeByIndex(index: number | number[]): this {
    const indices = new Set(coerceArray(index));
    return this.remove((_, i) => indices.has(i));
  }

  /**
   * @description get item of array based in the relative index
   * @param index
   */
  at(index: number): T | undefined {
    return arrayAt(this.array, index);
  }

  /**
   * @description sort the array based on a number of options
   * @param order
   * @param direction
   */
  orderBy(order?: OrderByType<T>, direction?: OrderByDirection): this {
    this.array = orderBy(this.array, order, direction);
    return this;
  }

  /**
   * @description get the last index of the array
   */
  getLastIndex(): number {
    return this.array.length - 1;
  }

  /**
   * @description get the last item of the array
   */
  getLast(): T | undefined {
    return this.array[this.getLastIndex()];
  }

  /**
   * @description get the first item of the array
   */
  getFirst(): T | undefined {
    return this.array[0];
  }

  /**
   * @description get a random item from the array, returns undefined if the array is empty
   */
  sample(): T | undefined {
    return sample(this.array);
  }

  uniqBy(key: keyof T): this {
    this.array = uniqBy(this.array, key);
    return this;
  }

  uniqWith(comparator: (valueA: T, valueB: T) => boolean): this {
    this.array = uniqWith(this.array, comparator);
    return this;
  }
}

export function arrayUtil<T extends Record<any, any>, K extends keyof T>(
  array: T[],
  idGetter: IdGetter<T, K>
): ArrayUtil<T, K> {
  return new ArrayUtil<T, K>(array, idGetter);
}
