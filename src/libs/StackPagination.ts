export class StackPagination<T> {
  public onChangeCurrent: (data: T) => void;
  store: (T & { _id: string })[];

  constructor() {
    this.store = [];
  }

  public push(data: T) {
    this.store.push({ ...data, _id: Math.random().toString() });
    this.onChange();
  }

  public pop() {
    this.store.pop();
    this.onChange();
  }

  public getChains(): (T & { _id: string })[] {
    return this.store;
  }

  public sliceTo(chain: T & { _id: string }): void {
    const index = [...this.store]
      .reverse()
      .findIndex((el) => el._id === chain._id);
    if (index > 0) {
      this.store = this.store.slice(0, -index);
    }
    this.onChange();
  }

  public current(): T & { _id: string } {
    return this.store[this.store.length - 1];
  }

  public clear(): void {
    this.store = [];
    this.onChange();
  }

  private onChange() {
    if (!this.onChangeCurrent) {
      return;
    }
    this.onChangeCurrent(this.current());
  }
}
