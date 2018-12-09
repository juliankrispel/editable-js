// @flow

import { createEditorState } from '../../create'
import { commit } from '../../history'
import handleBackspace from '../handleBackspace'
import { updateSelection } from '../../mutations'

describe('handleBackspace', () => {
  const initialState = createEditorState([{
    text: 'Line One',
    key: '1'
  }, {
    text: 'Line Two',
    key: '2'
  }])

  describe('when selection is not collapsed', () => {
    let newEditorState = commit(initialState, updateSelection, {
      startOffset: 4,
      startKey: '1',
      endOffset: 7,
      endKey: '2'
    })

    newEditorState = commit(newEditorState, handleBackspace)

    test('removes range', () => {
      expect(newEditorState.content).toMatchSnapshot()
    })

    test('collapses selection to start', () => {
      expect(newEditorState.selection).toMatchSnapshot()
    })
  })
})
