// @flow

import { createEditorState } from '../../create'
import commit from '../../commit'
import mergeBlock from '../mergeBlock'

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

describe('mergeBlock', () => {
  test('deletes block and its children', () => {
    const newEditorState = commit(
      initialState,
      mergeBlock,
      '2',
      '1'
    )

    const { content } = createEditorState([{
      key: '1',
      text: 'OneTwo',
      children: [{
        key: '3',
        text: 'Three'
      }]
    }])

    expect(newEditorState.content).toEqual(content)
  })
})
