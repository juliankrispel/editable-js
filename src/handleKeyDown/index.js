// @flow

import {
  isCollapsed
} from '../selection'

import {
  insertText,
  replaceText,
  splitBlock
} from '../mutations'

import {
  commit,
  undo,
  redo
} from '../history'

import handleBackspace from './handleBackspace'
import handleDelete from './handleDelete'

import type { EditorState } from '../types'

const isCharacterInsert = (e: SyntheticKeyboardEvent<*>) =>
  !e.altKey &&
  !e.metaKey &&
  !e.ctrlKey &&
  !e.key.includes('Arrow') &&
  !['Backspace', 'Delete', 'Meta', 'Alt', 'Enter', 'Control', 'Shift', 'Tab'].includes(e.key)

const isUndo = (e: SyntheticKeyboardEvent<*>) => !e.shiftKey && e.metaKey && e.key === 'z'
const isRedo = (e: SyntheticKeyboardEvent<*>) => e.shiftKey && e.metaKey && e.key === 'z'

export default function handleKeyDown (editorState: EditorState, event: SyntheticKeyboardEvent<*>): EditorState {
  let newEditorState = null

  if (isUndo(event)) {
    newEditorState = undo(editorState)
  } else if (isRedo(event)) {
    newEditorState = redo(editorState)
  } else if (event.key === 'Backspace') {
    newEditorState = commit(editorState, handleBackspace)
  } else if (event.key === 'Enter') {
    newEditorState = commit(editorState, splitBlock, editorState.selection)
  } else if (event.key === 'Delete') {
    newEditorState = commit(editorState, handleDelete)
  } else if (isCharacterInsert(event) && isCollapsed(editorState.selection)) {
    newEditorState = commit(editorState, insertText, editorState.selection, event.key)
  } else if (isCharacterInsert(event)) {
    newEditorState = commit(editorState, replaceText, editorState.selection, event.key)
  }

  if (newEditorState != null) {
    event.preventDefault()
    return newEditorState
  }

  return editorState
}
