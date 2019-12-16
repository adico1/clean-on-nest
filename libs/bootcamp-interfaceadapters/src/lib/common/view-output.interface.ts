export abstract class IViewOutput<T> {
  abstract get result(): T;
  abstract get error(): string;
}
