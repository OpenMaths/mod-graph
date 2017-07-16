import { CreateContentHolderEvent } from '@openmaths/graph-events'
import { None } from '@threestup/monads'

import ContentHolder from '.'

describe('Models/Grid/ContentHolder', () => {
  describe('constructor', () => {
    test('throws a Reference Error is rawUoIConstructor is None', () => {
      const CreateContentHolderEvent             = new CreateContentHolderEvent('graphId', 'parentId', 'Overwrite Me')
      CreateContentHolderEvent.rawUoIConstructor = None
      expect(() => new ContentHolder(CreateContentHolderEvent)).toThrow()
    })

    test('nodeId gets correctly assigned', () => {
      const CreateContentHolderEvent = new CreateContentHolderEvent('graphId', 'parentId', 'RawUoIConstructor')
      const subject                  = new ContentHolder(CreateContentHolderEvent)
      expect(subject.nodeId).toEqual(CreateContentHolderEvent.nodeId)
    })

    test('empty list of children is created', () => {
      const CreateContentHolderEvent = new CreateContentHolderEvent('graphId', 'parentId', 'RawUoIConstructor')
      const subject                  = new ContentHolder(CreateContentHolderEvent)
      expect(subject.children).toEqual([])
    })

    test('rawUoIConstructor gets correctly assigned', () => {
      const CreateContentHolderEvent = new CreateContentHolderEvent('graphId', 'parentId', 'RawUoIConstructor')
      const subject                  = new ContentHolder(CreateContentHolderEvent)
      expect(subject.rawUoIConstructor).toEqual(CreateContentHolderEvent.rawUoIConstructor)
    })
  })
})