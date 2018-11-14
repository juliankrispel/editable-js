// @flow

import type { RawBlock, EditorState, SelectionState, Block } from './types'
import genId from './genId'

export const createBlock = (newBlock: RawBlock): Block => ({
  ...newBlock,
  key: genId()
})

export const insertText = (
  editorState: EditorState,
  selection: SelectionState,
  text: string
): EditorState => {
  if (!isCollapsed(selection)) {
    throw new Error('cannot insert text when selection is not collapsed')
  }

  const { startOffset, startKey } = selection

  editorState.content = editorState.content.map(block => {
    if (block.key === startKey && typeof block.value === 'string') {
      console.log('yo', block.value, { text })
      const { value } = block
      block.value = `${value.slice(0, startOffset)}${text}${value.slice(startOffset)}`
    }

    return block
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
  const keys = content.map(block => block.key)
  const startIndex = keys.indexOf(startKey)
  const endIndex = keys.indexOf(endKey)
  let newContent = content

  if (selection.startKey === selection.endKey) {
    const { value } = newContent[startIndex]
    newContent[startIndex].value = value.slice(0, startOffset) + value.slice(endOffset)
  } else {
    newContent[startIndex].value = newContent[startIndex].value.slice(0, startOffset) + newContent[endIndex].value.slice(endOffset)
    newContent.splice(endIndex, 1)
  }

  newContent = content.filter((block, index) => index <= startIndex || endIndex <= index)

  return {
    ...editorState,
    content: newContent,
    selection: collapseToStart(selection)
  }
}

export const collapseToStart = (selection: SelectionState) => ({
  ...selection,
  endOffset: selection.startOffset,
  endKey: selection.startKey
})

export const splitBlock = (editorState: EditorState): EditorState => {
  let newEditorState = editorState

  if (!isCollapsed(newEditorState.selection)) {
    newEditorState = removeRange(newEditorState, newEditorState.selection)
  }

  const { startOffset, endOffset } = newEditorState.selection

  const blockToSplit = getBlockFor(newEditorState, newEditorState.selection.startKey)

  if (blockToSplit == null) {
    return editorState
  }

  const textBefore = blockToSplit.value.slice(0, startOffset)
  const textAfter = blockToSplit.value.slice(endOffset)

  const newBlock = createBlock({ ...blockToSplit, value: textAfter })

  newEditorState = updateBlock(newEditorState, blockToSplit.key, { value: textBefore })
  newEditorState = insertBlockAfter(newEditorState, newBlock)

  newEditorState.selection = {
    startKey: newBlock.key,
    endKey: newBlock.key,
    startOffset: 0,
    endOffset: 0
  }

  return newEditorState
}

export const updateBlock = (editorState: EditorState, key: string, blockUpdate: $Shape<Block>) => {
  const keys = editorState.content.map(block => block.key)
  const blockIndex = keys.indexOf(key)

  editorState.content[blockIndex] = {
    ...editorState.content[blockIndex],
    ...blockUpdate
  }

  return editorState
}

export const insertBlockBefore = (editorState: EditorState, block: Block): EditorState => {
  const { content, selection } = editorState
  const keys = content.map(block => block.key)
  const blockIndex = keys.indexOf(selection.endKey)

  return {
    ...editorState,
    content: content.slice(0, blockIndex)
      .concat([block]).concat(content.slice(blockIndex)),
    selection
  }
}

export const insertBlockAfter = (editorState: EditorState, block: Block): EditorState => {
  const { content, selection } = editorState
  const keys = content.map(block => block.key)
  const blockIndex = keys.indexOf(selection.endKey)

  return {
    ...editorState,
    content: content.slice(0, blockIndex + 1)
      .concat([block]).concat(content.slice(blockIndex + 1)),
    selection
  }
}

export const isCollapsed = (selection: SelectionState): boolean =>
  selection.startOffset === selection.endOffset &&
  selection.startKey === selection.endKey

export const getBlockFor = ({ content }: EditorState, key: string): ?Block =>
  content.find(block => block.key === key)

export const getBlockBefore = ({ content }: EditorState, key: string): ?Block =>
  content[content.map(block => block.key).indexOf(key) - 1]

export const getBlockAfter = ({ content }: EditorState, key: string): ?Block =>
  content[content.map(block => block.key).indexOf(key) + 1]
