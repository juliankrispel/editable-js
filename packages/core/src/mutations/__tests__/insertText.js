// @flow

import { createEditorState } from '../../create'
import { commit } from '../../history'
import insertText from '../insertText'

describe('insertText', () => {
  const initialState = createEditorState({ blocks: [{
    key: '1',
    text: 'One'
  }, {
    key: '2',
    text: 'Two'
  }]})

  const selection = {
    startKey: '1',
    endKey: '1',
    startOffset: 3,
    endOffset: 3
  }

  const newEditorState = commit(
    initialState,
    insertText,
    selection,
    ' and'
  )

  const expectedEditorState = createEditorState({ blocks: [{
    key: '1',
    text: 'One and'
  }, {
    key: '2',
    text: 'Two'
  }]})

  describe('inserts text and maintains character data', () => {
    expect(newEditorState.content).toEqual(expectedEditorState.content)
  })

  describe('moves selection ahead by text.length', () => {
    expect(newEditorState.selection).toEqual({
      startKey: '1',
      endKey: '1',
      startOffset: 7,
      endOffset: 7
    })
  })

  test('throws error when selection is not collapsed', () => {
    const selection = {
      startKey: '1',
      endKey: '1',
      startOffset: 0,
      endOffset: 3
    }

    expect(() => {
      commit(
        initialState,
        insertText,
        selection,
        'boing'
      )
    }).toThrow()
  })
})
