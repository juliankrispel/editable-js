// @flow

import { createEditorState } from '../../create'
import { commit } from '../../history'
import wrapRange from '../wrapRange'

describe('wrapRange', () => {
  const initialState = createEditorState({ blocks: [{
    key: '1',
    text: 'One'
  }, {
    key: '2',
    text: 'Two'
  }, {
    key: '3',
    text: 'Three'
  }]})
  const initialSelection = { ...initialState.selection }

  const selection = {
    startKey: '2',
    endKey: '3',
    startOffset: 1,
    endOffset: 2
  }

  const newEditorState = commit(
    initialState,
    wrapRange,
    selection,
    {
      key: '4',
      type: 'ordered-list'
    }
  )

  test('wraps children into new block', () => {
    expect(newEditorState.content).toMatchSnapshot()
  })

  test('maintains identical selection', () => {
    expect(newEditorState.selection).toEqual(initialSelection)
  })
})
