import { CreateContentHolderEvent } from '@openmaths/graph-events'
import { None } from '@threestup/monads'

import ContentHolder from '.'

describe('Models/Grid/ContentHolder', () => {
  describe('constructor', () => {
    test('throws a Reference Error is rawUoIConstructor is None', () => {
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

    test('empty list of children is created', () => {
      const event = new CreateContentHolderEvent(
        'graphId',
        'parentId',
        'RawUoIConstructor',
      )
      const subject = new ContentHolder(event)
      expect(subject.children).toEqual([])
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

  // describe('insertChild', () => {
  //   test('returns a reference to itself', () => {
  //     const event = new CreateContentHolderEvent(
  //       'graphId',
  //       'parentId',
  //       'RawUoIConstructor',
  //     )
  //     const contentHolder = new ContentHolder(event)
  //     const subject = contentHolder.insertChild()
  //     expect(subject instanceof ContentHolder).toEqual(true)
  //   })
  // })
})
