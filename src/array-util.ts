import { isArray, isFunction } from './util';
import { coerceArray } from './coersion';
import { orderBy, OrderByDirection, OrderByType } from './order-by';
import { uniqBy, uniqWith } from './uniq';
import { sample } from './sample';
import { arrayAt } from './array-at';
import { arrayRemove } from './array-remove';
import { arrayRotate } from './array-rotate';
import { arrayMoveImmutable } from 'array-move';

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
export type ArrayUtilVoidCallback<T extends Record<any, any>> = (entity: T, index: number, array: T[]) => void;

/**
 * @description a set of utilities to modify arrays of object with immutability
 */
export class ArrayUtil<T extends Record<any, any>, K extends keyof T = keyof T> implements Iterable<T> {
  constructor(private array: T[], idGetter: IdGetter<T, K>) {
    this._idGetter = parseIdGetter(idGetter);
  }

  private readonly _idGetter: IdGetterFn<T>;

  private _upsertOne(id: IdKeyType, partial: T | Partial<T> | ((entity: T | undefined) => T)): this {
    const itemIndex = this.array.findIndex(item => this._idGetter(item) === id);
    if (itemIndex === -1) {
      return this.append(isFunction(partial) ? partial(undefined) : (partial as T));
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

  *[Symbol.iterator](): Iterator<T> {
    for (const item of this.array) {
      yield item;
    }
  }

  toObject(): Record<IdKeyType, T> {
    const object: Record<IdKeyType, T> = {};
    for (const item of this.array) {
      object[this._idGetter(item)] = item;
    }
    return object;
  }

  toMap(): Map<IdKeyType, T> {
    const map = new Map<IdKeyType, T>();
    for (const item of this.array) {
      map.set(this._idGetter(item), item);
    }
    return map;
  }

  toSet(): Set<T> {
    return new Set(this.array);
  }

  toArray(): T[] {
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
   * @description update an item or items, based on a predicate and a update (partial type or callback)
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
  upsert(idOrItems: IdKeyType | (T | Partial<T>)[], partial?: T | Partial<T> | ((entity: T | undefined) => T)): this {
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
    const items = coerceArray(item);
    this.array = [...this.array.slice(0, index), ...items, ...this.array.slice(index)];
    return this;
  }

  /**
   * @description remove item or items of the array, based on the id, ids or predicate
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
   * @description remove item or items based in the index/indices
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

  uniq(): this {
    this.array = uniqBy(this.array, this._idGetter);
    return this;
  }

  uniqBy(key: keyof T): this {
    this.array = uniqBy(this.array, key);
    return this;
  }

  uniqWith(comparator: (valueA: T, valueB: T) => boolean): this {
    this.array = uniqWith(this.array, comparator);
    return this;
  }

  rotate(rotations: number): this {
    this.array = arrayRotate(this.array, rotations);
    return this;
  }

  move(fromIndex: number, toIndex: number): this {
    this.array = arrayMoveImmutable(this.array, fromIndex, toIndex);
    return this;
  }

  every(predicate: ArrayUtilPredicate<T>): boolean {
    return this.array.every(predicate);
  }

  filter(predicate: ArrayUtilPredicate<T>): this {
    this.array = this.array.filter(predicate);
    return this;
  }

  find(predicate: ArrayUtilPredicate<T>): T | undefined {
    return this.array.find(predicate);
  }

  findLast(predicate: ArrayUtilPredicate<T>): T | undefined {
    let index = this.array.length;
    while (index--) {
      const item = this.array[index];
      if (predicate(item, index, this.array)) {
        return item;
      }
    }
    return undefined;
  }

  findIndex(predicate: ArrayUtilPredicate<T>): number {
    return this.array.findIndex(predicate);
  }

  getIndexOf(id: IdKeyType): number {
    return this.array.findIndex(item => this._idGetter(item) === id);
  }

  forEach(callback: ArrayUtilVoidCallback<T>): this {
    this.array.forEach(callback);
    return this;
  }

  has(id: IdKeyType): boolean {
    return this.array.some(item => this._idGetter(item) === id);
  }

  map(callback: ArrayUtilUpdate<T>): this {
    this.array = this.array.map(callback);
    return this;
  }

  reverse(): this {
    this.array = [...this.array.reverse()];
    return this;
  }

  slice(start?: number, end?: number): this {
    this.array = this.array.slice(start, end);
    return this;
  }

  some(predicate: ArrayUtilPredicate<T>): boolean {
    return this.array.some(predicate);
  }
}

export function arrayUtil<T extends { id: number }, K extends keyof T>(array: T[]): ArrayUtil<T, K>;
export function arrayUtil<T extends Record<any, any>, K extends keyof T>(
  array: T[],
  idGetter: IdGetter<T, K>
): ArrayUtil<T, K>;
export function arrayUtil<T extends Record<any, any>, K extends keyof T>(
  array: T[],
  idGetter?: IdGetter<T, K>
): ArrayUtil<T, K> {
  return new ArrayUtil<T, K>(array, idGetter ?? ('id' as K));
}
