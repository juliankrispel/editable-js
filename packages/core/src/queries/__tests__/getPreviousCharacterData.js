// @flow

import { createEditorState } from '../../create'
import getPreviousCharacterData from '../getPreviousCharacterData'

const { content } = createEditorState({ blocks: [{
  key: '1',
  text: 'One',
  characterRanges: [{
    offset: 1,
    length: 1,
    marks: ['bold']
  }]
}]})

describe('getPreviousCharacterData', () => {
  test('gets character data from previous character', () => {
    const selection = {
      startKey: '1',
      endKey: '1',
      startOffset: 2,
      endOffset: 2
    }

    expect(getPreviousCharacterData(content, selection)).toMatchSnapshot()
  })

  test('returns null if block does not exist', () => {
    expect(getPreviousCharacterData(content, 'key-does-not-exist')).toBeNull()
  })
})
