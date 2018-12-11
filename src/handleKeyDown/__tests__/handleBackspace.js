// @flow

import { createEditorState } from '../../create'
import { commit } from '../../history'
import handleBackspace from '../handleBackspace'
import { updateSelection } from '../../mutations'

describe('handleBackspace', () => {
  const initialState = createEditorState({ blocks: [{
    text: 'Line One',
    key: '1'
  }, {
    text: 'Line Two',
    key: '2'
  }]})

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

  describe('when selection is collapsed', () => {
    let newEditorState = commit(initialState, updateSelection, {
      startOffset: 4,
      startKey: '1',
      endOffset: 4,
      endKey: '1'
    })

    newEditorState = commit(newEditorState, handleBackspace)

    test('removes previous character', () => {
      expect(newEditorState.content).toMatchSnapshot()
    })

    test('moves selection to prev character', () => {
      expect(newEditorState.selection).toMatchSnapshot()
    })
  })

  describe('when selection is collapsed and at start of block', () => {
    let newEditorState = commit(initialState, updateSelection, {
      startOffset: 0,
      startKey: '2',
      endOffset: 0,
      endKey: '2'
    })

    newEditorState = commit(newEditorState, handleBackspace)

    test('merges with previous block', () => {
      expect(newEditorState.content).toMatchSnapshot()
    })

    test('moves selection to end of previous block', () => {
      expect(newEditorState.selection).toMatchSnapshot()
    })
  })

  describe('when selection is collapsed and at beginning of the document', () => {
    let newEditorState = commit(initialState, updateSelection, {
      startOffset: 0,
      startKey: '1',
      endOffset: 0,
      endKey: '1'
    })

    newEditorState = commit(newEditorState, handleBackspace)

    test('editorState.content remains the same', () => {
      expect(newEditorState.content).toMatchSnapshot()
    })

    test('editorState.selection remains the same', () => {
      expect(newEditorState.selection).toMatchSnapshot()
    })
  })
})
