// @flow

import type { EditorState, SelectionState, Leaf } from './types'

/* Modifiers */
export const insertText = (
  editorState: EditorState,
  selection: SelectionState,
  text: string
): EditorState => {
  if (!isCollapsed(selection)) {
    throw new Error('cannot insert text when selection is not collapsed')
  }

  const { startOffset, startKey } = selection

  editorState.content = editorState.content.map(leaf => {
    if (leaf.key === startKey && typeof leaf.value === 'string') {
      const { value } = leaf
      leaf.value = `${value.slice(0, startOffset)}${text}${value.slice(startOffset)}`
    }

    return leaf
  })

  editorState.selection = {
    ...selection,
    startOffset: selection.startOffset + text.length,
    endOffset: selection.startOffset + text.length
  }

  return editorState
}

export const replaceText = (editorState: EditorState, selection: SelectionState, text: string): EditorState => {
  const newEditorState = removeRange(editorState, editorState.selection)
  return insertText(newEditorState, newEditorState.selection, text)
}

export const removeRange = (editorState: EditorState, selection: SelectionState): EditorState => {
  const { content } = editorState
  const { startKey, endKey, startOffset, endOffset } = selection
  const keys = content.map(leaf => leaf.key)
  const startIndex = keys.indexOf(startKey)
  const endIndex = keys.indexOf(endKey)

  const newContent = content.filter((leaf, index) => index <= startIndex || endIndex <= index)

  if (selection.startKey === selection.endKey) {
    const { value } = newContent[startIndex]
    newContent[startIndex].value = value.slice(0, startOffset) + value.slice(endOffset)
  } else {
    newContent[startIndex].value = newContent[startIndex].value.slice(0, startOffset) + newContent[endIndex].value.slice(endOffset)
    newContent.pop(endIndex)
  }

  return {
    content: newContent,
    selection: collapseToStart(selection)
  }
}

export const collapseToStart = (selection: SelectionState) => ({
  ...selection,
  endOffset: selection.startOffset,
  endKey: selection.startKey
})

export const getSelection = ({ content }: EditorState): SelectionState => {
  const {
    baseNode: { parentNode: anchorNode },
    baseOffset: anchorOffset, focusOffset, focusNode: { parentNode: focusNode }
  } = window.getSelection()

  const anchorKey = anchorNode.dataset.leafKey
  const focusKey = focusNode.dataset.leafKey

  const keys = content.map(node => node.key)
  const anchorIndex = keys.indexOf(anchorKey)
  const focusIndex = keys.indexOf(focusKey)

  let startOffset = anchorOffset
  let endOffset = focusOffset
  let startKey = anchorKey
  let endKey = focusKey

  const reverse = anchorIndex > focusIndex

  if (reverse === true) {
    startKey = focusKey
    endKey = anchorKey
    startOffset = focusOffset
    endOffset = anchorOffset
  }

  const selection = {
    startOffset,
    endOffset,
    startKey,
    endKey
  }

  return selection
}

export const isCollapsed = (selection: SelectionState): boolean =>
  selection.startOffset === selection.endOffset &&
  selection.startKey === selection.endKey

const findTextChild = (el: ?Node): ?Node => {
  if (el == null) {
    return null
  }

  return Array.from(el.childNodes).find(child => {
    if (child.nodeName === '#text') {
      return child
    } else if (child.childNodes.length > 0) {
      return findTextChild(child)
    }
  })
}

export const getLeaf = ({ content }: EditorState, key: string): ?Leaf =>
  content.find(leaf => leaf.key === leaf)

export const getLeafBefore = ({ content }: EditorState, key: string): ?Leaf =>
  content[content.map(leaf => leaf.key).indexOf(key) - 1]

export const getLeafAfter = ({ content }: EditorState, key: string): ?Leaf =>
  content[content.map(leaf => leaf.key).indexOf(key) + 1]

export const setDomSelection = (
  containerNode: HTMLElement,
  { startOffset, endOffset, startKey, endKey }: SelectionState
): void => {
  const newSelection = window.getSelection()
  const startNode = findTextChild(containerNode.querySelector(`[data-leaf-key="${startKey}"]`))
  const endNode = findTextChild(containerNode.querySelector(`[data-leaf-key="${endKey}"]`))
  newSelection.removeAllRanges()
  const range = document.createRange()

  if (startNode != null && endNode != null) {
    range.setStart(startNode, startOffset)
    range.setEnd(endNode, endOffset)
    newSelection.addRange(range)
  }
}
