export interface Node<T> {
  readonly nodeId: string;
  children: T[];
  insertChild(node: T, insertIndex: number): Node<T>; // @TODO should return `this`?
  removeChild(nodeId: string): Node<T>;
}
