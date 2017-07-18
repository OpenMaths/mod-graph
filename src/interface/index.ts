export interface BaseNode {
  readonly nodeId: string
}

export interface Node<T = never> extends BaseNode {
  children: T[]
  insertChild(node: T, insertIndex: number): this
  removeChild(nodeId: string): this
}

export interface NodeSingle<T = never> extends BaseNode {
  child: T | null
  insertChild(node: T): this
  removeChild(): this
}
