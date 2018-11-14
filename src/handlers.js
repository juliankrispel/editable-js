// @flow

import {
  splitBlock,
  removeRange,
  replaceText,
  isCollapsed,
  getBlockFor,
  insertText,
  getBlockBefore,
  getBlockAfter
} from './lib'

import type { EditorState } from './types'

export const handleBackspace = (editorState: EditorState): EditorState => {
  let { selection } = editorState

  if (!isCollapsed(selection)) {
    return removeRange(editorState, selection)
  }

  const blockBefore = getBlockBefore(editorState, selection.startKey)

  if (selection.startOffset > 0) {
    selection = {
      ...selection,
      startOffset: selection.startOffset - 1
    }
  } else if (blockBefore != null) {
    selection = {
      ...selection,
      startKey: blockBefore.key,
      startOffset: blockBefore.value.length
    }
  } else {
    return editorState
  }

  return removeRange(editorState, selection)
}

export const handleDelete = (editorState: EditorState): EditorState => {
  let { selection } = editorState

  if (!isCollapsed(selection)) {
    return removeRange(editorState, selection)
  }

  const blockAfter = getBlockAfter(editorState, selection.endKey)
  const currentBlock = getBlockFor(editorState, selection.endKey)

  if (currentBlock == null) {
    throw new Error('current block not defined')
  }

  if (selection.endOffset < currentBlock.value.length) {
    selection = {
      ...selection,
      endOffset: selection.endOffset + 1
    }
  } else if (blockAfter != null) {
    selection = {
      ...selection,
      endKey: blockAfter.key,
      endOffset: 0
    }
  } else {
    return editorState
  }

  return removeRange(editorState, selection)
}

const isCharacterInsert = (e: SyntheticKeyboardEvent<*>) =>
  !e.altKey &&
  !e.metaKey &&
  !e.ctrlKey &&
  !e.key.includes('Arrow') &&
  !['BackSpace', 'Delete', 'Meta', 'Alt', 'Enter', 'Control', 'Shift', 'Tab'].includes(e.key)

export const handleKeyDown = (editorState: EditorState, event: SyntheticKeyboardEvent<*>): EditorState => {
  let newEditorState = null

  if (event.key === 'Backspace') {
    newEditorState = handleBackspace(editorState)
  } else if (event.key === 'Enter') {
    newEditorState = splitBlock(editorState)
  } else if (event.key === 'Delete') {
    newEditorState = handleDelete(editorState)
  } else if (isCharacterInsert(event) && isCollapsed(editorState.selection)) {
    newEditorState = insertText(editorState, editorState.selection, event.key)
  } else if (isCharacterInsert(event)) {
    newEditorState = replaceText(editorState, editorState.selection, event.key)
  }

  if (newEditorState != null) {
    event.preventDefault()
    return newEditorState
  }

  return editorState
}