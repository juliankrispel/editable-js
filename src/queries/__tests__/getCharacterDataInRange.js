// @flow

import { createEditorState } from '../../create'
import getCharacterDataInRange from '../getCharacterDataInRange'

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

describe('getCharacterDataInRange.js', () => {
  test('gets character data in range', () => {
    const selection = {
      startKey: '1',
      endKey: '1',
      startOffset: 0,
      endOffset: 3
    }

    const expected = [{
      marks: []
    }, {
      marks: ['bold']
    }, {
      marks: ['bold']
    }]

    expect(getCharacterDataInRange(content, selection)).toEqual(expected)
  })

  test('gets data across block siblings', () => {
    const selection = {
      startKey: '1',
      endKey: '2',
      startOffset: 1,
      endOffset: 3
    }

    const expected = [{
      marks: ['bold']
    }, {
      marks: ['bold']
    }, {
      marks: [],
      entity: '1'
    }, {
      marks: [],
      entity: '1'
    }, {
      marks: []
    }]

    expect(getCharacterDataInRange(content, selection)).toEqual(expected)
  })

  test('get data inside one block', () => {
    const selection = {
      startKey: '1',
      endKey: '1',
      startOffset: 1,
      endOffset: 2
    }

    const expected = [{
      marks: ['bold']
    }]

    expect(getCharacterDataInRange(content, selection)).toEqual(expected)
  })
})
