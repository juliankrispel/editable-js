// @flow

import { createEditorState } from '../../create'
import { commit } from '../../history'
import splitBlock from '../splitBlock'

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

describe('splitBlock', () => {
  test('splits block at root level, including children', () => {
    const selection = {
      startKey: '1',
      endKey: '1',
      startOffset: 1,
      endOffset: 1
    }

    const newEditorState = commit(
      initialState,
      splitBlock,
      selection
    )

    const { content } = createEditorState([{
      key: '1',
      text: 'O'
    }, {
      key: expect.any(String),
      text: 'ne',
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

  test('splits block at child level, including children', () => {
    const selection = {
      startKey: '2',
      endKey: '2',
      startOffset: 1,
      endOffset: 1
    }

    const newEditorState = commit(
      initialState,
      splitBlock,
      selection
    )

    const { content } = createEditorState([{
      key: '1',
      text: 'One',
      children: [{
        key: '2',
        text: 'T'
      }, {
        key: expect.any(String),
        text: 'wo',
        children: [{
          key: '3',
          text: 'Three'
        }]
      }]
    }])

    expect(newEditorState.content).toEqual(content)
  })

  test('removes range before splitting block', () => {
    const selection = {
      startKey: '1',
      endKey: '2',
      startOffset: 1,
      endOffset: 1
    }

    const newEditorState = commit(
      initialState,
      splitBlock,
      selection
    )

    const { content } = createEditorState([{
      key: expect.any(String),
      text: 'O'
    }, {
      key: expect.any(String),
      text: 'wo',
      children: [{
        key: expect.any(String),
        text: 'Three'
      }]
    }])
    expect(newEditorState.content).toEqual(content)
  })
})
