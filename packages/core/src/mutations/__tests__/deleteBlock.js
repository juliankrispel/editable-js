// @flow

import { createEditorState } from '../../create'
import { commit } from '../../history'
import deleteBlock from '../deleteBlock'

describe('deleteBlock', () => {
  test('deletes block and its children', () => {
    const initialState = createEditorState({ blocks: [{
      key: '1',
      text: 'One',
      children: [{
        key: '2',
        text: 'Two',
        children: [{
          key: '3',
          text: 'Three'
        }]
      }]
    }]})

    const newEditorState = commit(
      initialState,
      deleteBlock,
      initialState.content[0].children[0].key
    )

    const { content } = createEditorState({ blocks: [{
      key: '1',
      text: 'One',
      children: []
    }]})

    expect(newEditorState.content).toEqual(content)
  })

  test('deletes block at root', () => {
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

    const newEditorState = commit(
      initialState,
      deleteBlock,
      '1'
    )

    const { content } = createEditorState({ blocks: [{
      key: '2',
      text: 'Two'
    }, {
      key: '3',
      text: 'Three'
    }]})

    expect(newEditorState.content).toEqual(content)
  })
})
