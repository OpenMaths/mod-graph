// import { CreateColumnEvent, CreateRowEvent } from '@openmaths/graph-events'
//
// import Row from './'
//
// import Column from '../Column'
//
// describe('Row', () => {
//   describe('constructor', () => {
//     test('nodeId gets correctly assigned', () => {
//       const event = new CreateRowEvent('graphId', 'parentId', 0)
//       const subject = new Row(event)
//       expect(subject.nodeId).toEqual(event.nodeId)
//     })
//
//     test('parentId gets correctly assigned', () => {
//       const event = new CreateRowEvent('graphId', 'parentId', 0)
//       const subject = new Row(event)
//       expect(subject.parentId).toEqual(event.parentId)
//     })
//
//     test('index gets correctly assigned', () => {
//       const event = new CreateRowEvent('graphId', 'parentId', 42)
//       const subject = new Row(event)
//       expect(subject.index).toEqual(event.insertIndex.unwrap())
//     })
//
//     test('children is an empty list', () => {
//       const event = new CreateRowEvent('graphId', 'parentId', 0)
//       const subject = new Row(event)
//       expect(subject.children).toEqual([])
//     })
//   })
//
//   describe('insertChild', () => {
//     test('when inserting a unique node, it is by default added at index 0', () => {
//       const event_row = new CreateRowEvent('graphId', 'parentId', 0)
//       const event_column = new CreateColumnEvent('graphId', event_row.nodeId, 0)
//       let row = new Row(event_row)
//       const column = new Column(event_column)
//       const subject = row.insertChild(column)
//       expect(subject.children).toEqual([column])
//     })
//
//     test('when inserting a unique node, it can be added at any index less than or equal to the current number of children', () => {
//       const event_row = new CreateRowEvent('graphId', 'parentId', 0)
//       const event_column_1 = new CreateColumnEvent(
//         'graphId',
//         event_row.nodeId,
//         0,
//       )
//       const event_column_2 = new CreateColumnEvent(
//         'graphId',
//         event_row.nodeId,
//         1,
//       )
//       let row = new Row(event_row)
//       const column_1 = new Column(event_column_1)
//       const column_2 = new Column(event_column_2)
//       row.children = [column_1] // Force this first so we can focus on correct assertion
//       const subject = row.insertChild(column_2)
//       expect(subject.children).toEqual([column_1, column_2])
//     })
//
//     test('when inserting a unique node, adding it at index greater than the current number of children throws a Range Error', () => {
//       const event_row = new CreateRowEvent('graphId', 'parentId', 0)
//       const event_column_1 = new CreateColumnEvent(
//         'graphId',
//         event_row.nodeId,
//         0,
//       )
//       const event_column_2 = new CreateColumnEvent(
//         'graphId',
//         event_row.nodeId,
//         42,
//       )
//       let row = new Row(event_row)
//       const column_1 = new Column(event_column_1)
//       const column_2 = new Column(event_column_2)
//       row.children = [column_1] // Force this first so we can focus on correct assertion
//       expect(() => row.insertChild(column_2)).toThrow()
//     })
//
//     test('when inserting a non-unique node, a Reference Error is thrown', () => {
//       const event_row = new CreateRowEvent('graphId', 'parentId', 0)
//       const event_column = new CreateColumnEvent('graphId', event_row.nodeId, 0)
//       let row = new Row(event_row)
//       const column_1 = new Column(event_column)
//       const column_2 = new Column(event_column)
//       row.children = [column_1] // Force this first so we can focus on correct assertion
//       expect(() => row.insertChild(column_2)).toThrow()
//     })
//   })
//
//   describe('removeChild', () => {})
// })
