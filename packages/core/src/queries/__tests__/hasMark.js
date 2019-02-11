// @flow

import { createEditorState } from '../../create'
import hasMark from '../hasMark'

const { content } = createEditorState({ blocks: [{
  key: '1',
  text: 'One',
  characterRanges: [{
    offset: 1,
    length: 2,
    marks: ['bold']
  }],
  children: [{
    key: '2',
    text: 'Two',
    characterRanges: [{
      offset: 0,
      length: 2,
      entity: '1'
    }]
  }]
}]})

describe('hasMark', () => {
  test('returns true if mark in range', () => {
    const selection = {
      startKey: '1',
      endKey: '1',
      startOffset: 0,
      endOffset: 3
    }

    expect(hasMark(content, selection, 'bold')).toBe(true)
  })

  test('returns false if mark not in range', () => {
    const selection = {
      startKey: '1',
      endKey: '1',
      startOffset: 0,
      endOffset: 1
    }

    expect(hasMark(content, selection, 'bold')).toBe(false)
  })
})
