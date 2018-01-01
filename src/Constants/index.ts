import { ActionType } from "@openmaths/graph-events"

const ErrorMessage = {
  CannotInsertChild: (nodeId: string) =>
    `Cannot insert "${nodeId}". Another child already present.`,
  DuplicateNodeId: (nodeId: string) => `"${nodeId}" already exists.`,
  NodeIdNotFound: (nodeId: string) => `"${nodeId}" could not be found.`,
  InvalidInsertIndex: (index: number) =>
    `Insert index "${index}" cannot be greater than children count.`,
  UnknownActionType: (type: ActionType) => `Unknown Action Type "${type}"`,
  ColumnNotFound: (nodeId: string) => `Column "${nodeId}" not found`,
  RowNotFound: (nodeId: string) => `Row "${nodeId}" not found`,
  ContainerNotFound: (nodeId: string) => `Container "${nodeId}" not found`,
  GraphNotFound: (nodeId: string) => `Graph "${nodeId}" not found`,
  ColumnOrGraphNotFound: (nodeId: string) => `Column or Graph "${nodeId}" not found`,
  FailedDeleteAttempt: (nodeId: string) => `Cannot delete "${nodeId}" as it could not be found`,
}

export { ErrorMessage }
