import { CreateContentHolderEvent } from '@openmaths/graph-events'
import { None } from '@threestup/monads'

import ContentHolder from '.'

describe('ContentHolder', () => {
  describe('constructor', () => {
    test('throws a Reference Error if rawUoIConstructor is None', () => {
      const event = new CreateContentHolderEvent(
        'graphId',
        'parentId',
        'Overwrite Me',
      )
      event.rawUoIConstructor = None
      expect(() => new ContentHolder(event)).toThrow()
    })

    test('nodeId gets correctly assigned', () => {
      const event = new CreateContentHolderEvent(
        'graphId',
        'parentId',
        'RawUoIConstructor',
      )
      const subject = new ContentHolder(event)
      expect(subject.nodeId).toEqual(event.nodeId)
    })

    test('index gets correctly assigned', () => {
      const event = new CreateContentHolderEvent(
        'graphId',
        'parentId',
        'RawUoIConstructor',
      )
      const subject = new ContentHolder(event)
      expect(subject.index).toEqual(0)
    })

    test('no child is present', () => {
      const event = new CreateContentHolderEvent(
        'graphId',
        'parentId',
        'RawUoIConstructor',
      )
      const subject = new ContentHolder(event)
      expect(subject.child).toBeUndefined()
    })

    test('rawUoIConstructor gets correctly assigned', () => {
      const event = new CreateContentHolderEvent(
        'graphId',
        'parentId',
        'RawUoIConstructor',
      )
      const subject = new ContentHolder(event)
      expect(subject.rawUoIConstructor).toEqual(
        event.rawUoIConstructor.unwrap(),
      )
    })
  })
})
