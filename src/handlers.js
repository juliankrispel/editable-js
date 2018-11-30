// @flow

import {
  isCollapsed
} from './selection'

import {
  getBlockBefore,
  getBlock,
  getBlockAfter
} from './queries'

import {
  insertText,
  removeRange,
  replaceText,
  splitBlock
} from './mutations'

import {
  commit,
  undo,
  redo
} from './history'

import type { EditorState } from './types'

export const handleBackspace = (editorState: EditorState): void => {
  let selection = {
    ...editorState.selection
  }

  if (!isCollapsed(selection)) {
    return removeRange(editorState, selection)
  }

  const blockBefore = getBlockBefore(editorState.content, selection.startKey)

  if (selection.startOffset > 0) {
    selection = {
      ...selection,
      startOffset: selection.startOffset - 1
    }
  } else if (blockBefore != null) {
    selection = {
      ...selection,
      startKey: blockBefore.key,
      startOffset: blockBefore.text.length
    }
  } else {
    return
  }

  return removeRange(editorState, selection)
}

export const handleDelete = (editorState: EditorState): void => {
  if (!isCollapsed(editorState.selection)) {
    removeRange(editorState, editorState.selection)
  }

  const { content, selection } = editorState
  const blockAfter = getBlockAfter(content, selection.endKey)
  const currentBlock = getBlock(content, selection.endKey)

  if (currentBlock == null) {
    throw new Error('current block not defined')
  }

  if (selection.endOffset < currentBlock.text.length) {
    selection.endOffset = selection.endOffset
  } else if (blockAfter != null) {
    selection.endKey = blockAfter.key
    selection.endOffset = 0
  } else {
    return
  }

  removeRange(editorState, selection)
}

const isCharacterInsert = (e: SyntheticKeyboardEvent<*>) =>
  !e.altKey &&
  !e.metaKey &&
  !e.ctrlKey &&
  !e.key.includes('Arrow') &&
  !['BackSpace', 'Delete', 'Meta', 'Alt', 'Enter', 'Control', 'Shift', 'Tab'].includes(e.key)

const isUndo = (e: SyntheticKeyboardEvent<*>) => !e.shiftKey && e.metaKey && e.key === 'z'
const isRedo = (e: SyntheticKeyboardEvent<*>) => e.shiftKey && e.metaKey && e.key === 'z'

export const handleKeyDown = (editorState: EditorState, event: SyntheticKeyboardEvent<*>): EditorState => {
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
