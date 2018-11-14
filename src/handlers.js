// @flow

import { removeRange, replaceText, isCollapsed, getLeaf, insertText, getLeafBefore, getLeafAfter } from './lib'
import type { EditorState } from './types'

export const handleBackspace = (editorState: EditorState): EditorState => {
  let { selection } = editorState

  if (!isCollapsed(selection)) {
    return removeRange(editorState, selection)
  }

  const leafBefore = getLeafBefore(editorState, selection.startKey)

  if (selection.startOffset > 0) {
    selection = {
      ...selection,
      startOffset: selection.startOffset - 1
    }
  } else if (leafBefore != null) {
    selection = {
      ...selection,
      startKey: leafBefore.key,
      startOffset: leafBefore.value.length
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

  const leafAfter = getLeafAfter(editorState, selection.endKey)
  const currentLeaf = getLeaf(editorState, selection.endKey)

  if (currentLeaf == null) {
    throw new Error('current leaf not defined')
  }

  if (selection.endOffset < currentLeaf.value.length) {
    selection = {
      ...selection,
      endOffset: selection.endOffset + 1
    }
  } else if (leafAfter != null) {
    selection = {
      ...selection,
      endKey: leafAfter.key,
      endOffset: 0
    }
  } else {
    return editorState
  }

  return removeRange(editorState, selection)
}

const isCharacterInsert = (e: SyntheticKeyboardEvent<*>) =>
  !e.key.includes('Arrow') && !['BackSpace', 'Delete', 'Meta', 'Alt', 'Enter', 'Control', 'Shift', 'Tab'].includes(e.key)

export const handleKeyDown = (editorState: EditorState, event: SyntheticKeyboardEvent<*>): EditorState => {
  console.log('event.key', event.key)

  if (event.key === 'Backspace') {
    return handleBackspace(editorState)
  } else if (event.key === 'Delete') {
    return handleDelete(editorState)
  } else if (isCharacterInsert(event) && isCollapsed(editorState.selection)) {
    return insertText(editorState, editorState.selection, event.key)
  } else if (isCharacterInsert(event)) {
    return replaceText(editorState, editorState.selection, event.key)
  }

  return editorState
}
