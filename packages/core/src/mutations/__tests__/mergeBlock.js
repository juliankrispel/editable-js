// @flow

import { createEditorState } from '../../create'
import { commit } from '../../history'
import mergeBlock from '../mergeBlock'

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

describe('mergeBlock', () => {
  test('deletes block and its children', () => {
    const newEditorState = commit(
      initialState,
      mergeBlock,
      '2',
      '1'
    )

    const { content } = createEditorState({ blocks: [{
      key: '1',
      text: 'OneTwo',
      children: [{
        key: '3',
        text: 'Three'
      }]
    }]})

    expect(newEditorState.content).toEqual(content)
  })

  test('throws if we are trying to merge block with descendant', () => {
    expect(() => commit(
      initialState,
      mergeBlock,
      '1',
      '2'
    )).toThrow()
  })

  test('throws if we are trying to merge block with non existent target block', () => {
    expect(() => commit(
      initialState,
      mergeBlock,
      '1',
      '8'
    )).toThrow()
  })

  test('throws if we are trying to merge non existent block', () => {
    expect(() => commit(
      initialState,
      mergeBlock,
      '9',
      '2'
    )).toThrow()
  })
})
