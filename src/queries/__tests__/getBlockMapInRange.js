// @flow

import { createEditorState } from '../../create'
import getBlockMapInRange from '../getBlockMapInRange'

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

describe('getBlockMapInRange', () => {
  describe('filter blocks that touch selection', () => {
    test('when range starts with parent and ends with child', () => {
      const selection = {
        startKey: content[0].key,
        startOffset: 0,
        endKey: content[0].children[0].key,
        endOffset: 2
      }

      const expectedState = {
        [content[0].key]: {
          path: [0],
          block: content[0]
        },
        [content[0].children[0].key]: {
          path: [0, 0],
          block: content[0].children[0]
        }
      }

      expect(getBlockMapInRange(content, selection)).toEqual(expectedState)
    })

    test('when range starts with child and ends with parent', () => {
      const selection = {
        startKey: content[0].children[0].key,
        startOffset: 0,
        endKey: content[1].key,
        endOffset: 2
      }

      const expectedState = {
        [content[0].children[0].key]: {
          path: [0, 0],
          block: content[0].children[0]
        },
        [content[0].children[0].children[0].key]: {
          path: [0, 0, 0],
          block: content[0].children[0].children[0]
        },
        [content[1].key]: {
          path: [1],
          block: content[1]
        }
      }

      expect(getBlockMapInRange(content, selection)).toEqual(expectedState)
    })
  })
})
