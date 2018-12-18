// @flow

import { createEditorState } from '../../create'
import hasBlockType from '../hasBlockType'

const { content } = createEditorState({ blocks: [{
  key: '1',
  text: 'One',
  children: [{
    key: '2',
    text: 'Two',
    children: [{
      key: '3',
      text: 'Three',
      type: 'code-block'
    }]
  }, {
    key: '4',
    text: 'Four'
  }]
}]})

describe('hasBlockType', () => {
  describe('returns true', () => {
    test('if mark in range', () => {
      const selection = {
        startKey: '1',
        endKey: '3',
        startOffset: 0,
        endOffset: 0
      }

      expect(hasBlockType(content, selection, 'code-block')).toBe(true)
    })

    test('if mark in range and selection collapsed', () => {
      const selection = {
        startKey: '3',
        endKey: '3',
        startOffset: 0,
        endOffset: 0
      }

      expect(hasBlockType(content, selection, 'code-block')).toBe(true)
    })
  })

  test('returns false if mark not in range', () => {
    const selection = {
      startKey: '4',
      endKey: '4',
      startOffset: 0,
      endOffset: 0
    }

    expect(hasBlockType(content, selection, 'code-block')).toBe(false)
  })
})
