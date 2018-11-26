// @flow

import { createEditorState } from '../../create'
import commit from '../../commit'
import updateBlock from '../updateBlock'

const initialState = createEditorState([{
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
}])

describe('updateBlock', () => {
  test('deletes block 1 and its children', () => {
    const newEditorState = commit(
      initialState,
      updateBlock,
      '1',
      { text: 'Hello World' }
    )

    const { content } = createEditorState([{
      key: '1',
      text: 'Hello World',
      children: [{
        key: '2',
        text: 'Two',
        children: [{
          key: '3',
          text: 'Three'
        }]
      }]
    }])

    expect(newEditorState.content).toEqual(content)
  })

  test('deletes block 2 and its children', () => {
    const newEditorState = commit(
      initialState,
      updateBlock,
      '2',
      { text: 'Hello World' }
    )

    const { content } = createEditorState([{
      key: '1',
      text: 'One',
      children: [{
        key: '2',
        text: 'Hello World',
        children: [{
          key: '3',
          text: 'Three'
        }]
      }]
    }])

    expect(newEditorState.content).toEqual(content)
  })
})
