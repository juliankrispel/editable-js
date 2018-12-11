// @flow

import { createEditorState } from '../../create'
import getBlockListInRange from '../getBlockListInRange'

const { content } = createEditorState({ blocks: [{
  text: 'One',
  children: [{
    text: 'Two',
    children: [{
      text: 'Three'
    }]
  }]
}, {
  text: 'Four'
}]})

describe('getBlockListInRange', () => {
  describe('filter blocks that touch selection', () => {
    test('when range starts with parent and ends with child', () => {
      const selection = {
        startKey: content[0].key,
        startOffset: 0,
        endKey: content[0].children[0].key,
        endOffset: 2
      }

      const expectedState = [{
        path: [0],
        key: content[0].key,
        block: content[0]
      }, {
        path: [0, 0],
        key: content[0].children[0].key,
        block: content[0].children[0]
      }]

      expect(getBlockListInRange(content, selection)).toEqual(expectedState)
    })

    test('when range starts with child and ends with parent', () => {
      const selection = {
        startKey: content[0].children[0].key,
        startOffset: 0,
        endKey: content[1].key,
        endOffset: 2
      }

      const expectedState = [{
        path: [0, 0],
        key: content[0].children[0].key,
        block: content[0].children[0]
      }, {
        path: [0, 0, 0],
        key: content[0].children[0].children[0].key,
        block: content[0].children[0].children[0]
      }, {
        path: [1],
        key: content[1].key,
        block: content[1]
      }]

      expect(getBlockListInRange(content, selection)).toEqual(expectedState)
    })
  })
})
