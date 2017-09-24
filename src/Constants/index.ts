const ErrorMessage = {
  CannotInsertChild: (nodeId: string) =>
    `Cannot insert "${nodeId}". Another child already present.`,
  DuplicateNodeId: (nodeId: string) => `"${nodeId}" already exists.`,
  NodeIdNotFound: (nodeId: string) => `"${nodeId}" could not be found.`,
  InvalidInsertIndex: (index: number) =>
    `Insert index "${index}" cannot be greater than children count.`,
}

export { ErrorMessage }
