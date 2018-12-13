// @flow

import { createEditorState } from '../../create'
import { commit } from '../../history'
import toggleCurrentMark from '../toggleCurrentMark'

const state = createEditorState({
  blocks: [{
    key: '1',
    text: 'Hello World',
    characterRanges: [{
      offset: 0,
      length: 1
    }]
  }]
})

describe('toggleCurrentMark', () => {
  test('toggles current mark', () => {
    const newEditorState = commit(state, toggleCurrentMark, 'bold')
    expect(newEditorState).toMatchSnapshot()
    expect(commit(newEditorState, toggleCurrentMark, 'bold')).toMatchSnapshot()
  })
})
