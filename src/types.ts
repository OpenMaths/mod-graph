export interface BaseNode {
  createdAt: Date
  index: number
  modifiedAt: Date
  nodeId: string
  parentId: string
  touch(): BaseNode
}
