// @flow

import { createEditorState } from '../../create'
import { commit } from '../../history'
import toggleBlockType from '../toggleBlockType'

const state = createEditorState({
  blocks: [{
    text: 'Hello',
    key: '1',
    children: [{
      key: '2',
      text: 'World',
      type: 'header'
    }]
  }]
})

describe('toggleBlockType', () => {
  test('removes block type when it is already in range', () => {
    const selection = {
      startKey: '1',
      endKey: '2',
      startOffset: 0,
      endOffset: 2
    }

    const result = commit(state, toggleBlockType, selection, 'header')
    expect(result.content).toMatchSnapshot()
  })

  test('adds block type when it is not in range', () => {
    const selection = {
      startKey: '1',
      endKey: '2',
      startOffset: 0,
      endOffset: 2
    }

    const result = commit(state, toggleBlockType, selection, 'code')
    expect(result.content).toMatchSnapshot()
  })
})
