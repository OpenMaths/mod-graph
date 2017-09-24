// import { CreateColumnEvent } from '@openmaths/graph-events'
//
// import ContentHolder from './'
//
// describe('Column', () => {
//   describe('constructor', () => {
//     test('nodeId gets correctly assigned', () => {
//       const event = new CreateColumnEvent('graphId', 'parentId', 0)
//       const subject = new ContentHolder(event)
//       expect(subject.nodeId).toEqual(event.nodeId)
//     })
//
//     test('parentId gets correctly assigned', () => {
//       const event = new CreateColumnEvent('graphId', 'parentId', 0)
//       const subject = new ContentHolder(event)
//       expect(subject.parentId).toEqual(event.parentId)
//     })
//
//     test('index gets correctly assigned', () => {
//       const event = new CreateColumnEvent('graphId', 'parentId', 42)
//       const subject = new ContentHolder(event)
//       expect(subject.index).toEqual(event.insertIndex.unwrap())
//     })
//
//     test('a null reference is assigned to the child', () => {
//       const event = new CreateColumnEvent('graphId', 'parentId', 0)
//       const subject = new ContentHolder(event)
//       expect(subject.child).toEqual(null)
//     })
//   })
//
//   describe('insertChild', () => {
//     test('if child is `null`, inserts new child', () => {
//       const event = new CreateColumnEvent('graphId', 'parentId', 0)
//       const newChild = 'Child'
//       let subject = new ContentHolder<string>(event)
//       subject.insertChild(newChild)
//       expect(subject.child).toEqual(newChild)
//     })
//
//     test('if child is not `null`, throws a Reference Error', () => {
//       const event = new CreateColumnEvent('graphId', 'parentId', 0)
//       const newChild = 'Child'
//       let subject = new ContentHolder<string>(event)
//       subject.child = newChild // Force assign so that insertChild fails
//       expect(() => subject.insertChild(newChild)).toThrow(ReferenceError)
//     })
//   })
//
//   describe('removeChild', () => {
//     test('sets child to null', () => {
//       const event = new CreateColumnEvent('graphId', 'parentId', 0)
//       const newChild = 'Child'
//       let subject = new ContentHolder<string>(event)
//       subject.child = newChild
//       subject.removeChild()
//       expect(subject.child).toEqual(null)
//     })
//   })
// })
