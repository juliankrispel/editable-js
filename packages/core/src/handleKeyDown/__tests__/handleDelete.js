// @flow

import { createEditorState } from '../../create'
import { commit } from '../../history'
import handleDelete from '../handleDelete'
import { updateSelection } from '../../mutations'

describe('handleDelete', () => {
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

    newEditorState = commit(newEditorState, handleDelete)

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

    newEditorState = commit(newEditorState, handleDelete)

    test('removes next character', () => {
      expect(newEditorState.content).toMatchSnapshot()
    })

    test('selection remains the same', () => {
      expect(newEditorState.selection).toMatchSnapshot()
    })
  })

  describe('when selection is collapsed and at end of block', () => {
    let newEditorState = commit(initialState, updateSelection, {
      startOffset: initialState.content[0].text.length,
      startKey: '1',
      endOffset: initialState.content[0].text.length,
      endKey: '1'
    })

    newEditorState = commit(newEditorState, handleDelete)

    test('merges with next block', () => {
      expect(newEditorState.content).toMatchSnapshot()
    })

    test('selection remains the same', () => {
      expect(newEditorState.selection).toMatchSnapshot()
    })
  })

  describe('when selection is collapsed and at end of the document', () => {
    let newEditorState = commit(initialState, updateSelection, {
      startOffset: initialState.content[0].text.length,
      startKey: '2',
      endOffset: initialState.content[0].text.length,
      endKey: '2'
    })

    newEditorState = commit(newEditorState, handleDelete)

    test('editorState.content remains the same', () => {
      expect(newEditorState.content).toMatchSnapshot()
    })

    test('editorState.selection remains the same', () => {
      expect(newEditorState.selection).toMatchSnapshot()
    })
  })
})
