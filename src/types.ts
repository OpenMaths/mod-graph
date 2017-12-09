export interface BaseNode {
  createdAt: string
  index: number
  modifiedAt: string
  nodeId: string
  parentId: string
  touch(): BaseNode
}
