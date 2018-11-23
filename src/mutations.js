// @flow

import type { EditorState, SelectionState, Block } from './types'
import { createBlock } from './create'
import { flattenTree } from './tree'

export const insertText = (
  editorState: EditorState,
  _text: string
): void => {
  const { selection } = editorState

  if (!isCollapsed(selection)) {
    throw new Error('cannot insert text when selection is not collapsed')
  }

  const { startOffset, startKey } = selection
  const flattenedTree = flattenTree(editorState.content)

  flattenedTree.forEach(block => {
    if (block.key === startKey && typeof block.text === 'string') {
      const { text } = block
      block.text = `${text.slice(0, startOffset)}${_text}${text.slice(startOffset)}`
    }
  })

  const offset = selection.startOffset + _text.length

  editorState.selection.startOffset = offset
  editorState.selection.endOffset = offset
}

export const replaceText = (editorState: EditorState, selection: SelectionState, _text: string): void => {
  removeRange(editorState, editorState.selection)
  insertText(editorState, _text)
}

export const deleteBlock = (editorState: EditorState, key: string) => {
  editorState.content.getBlockByKey(editorState, key)
}

export const removeRange = (editorState: EditorState, selection: SelectionState): void => {
  const { content } = editorState
  const { startKey, endKey, startOffset, endOffset } = selection
  const keys = content.map(block => block.key)
  const startIndex = keys.indexOf(startKey)
  const endIndex = keys.indexOf(endKey)

  console.log('yo, selection', selection)

  if (selection.startKey === selection.endKey) {
    const { text } = content[startIndex]
    content[startIndex].text = text.slice(0, startOffset) + text.slice(endOffset)
  } else {
    content[startIndex].text = content[startIndex].text.slice(0, startOffset) + content[endIndex].text.slice(endOffset)
    content.splice(endIndex, 1)
  }

  content.forEach((block, index) => {
    if (!(index <= startIndex || endIndex <= index)) {
      content.splice(index, 1)
    }
  })

  editorState.selection = collapseToStart(selection)
}

export const collapseToStart = (selection: SelectionState): SelectionState => ({
  ...selection,
  endOffset: selection.startOffset,
  endKey: selection.startKey
})

export const splitBlock = (editorState: EditorState, selection: SelectionState): void => {
  if (!isCollapsed(selection)) {
    removeRange(editorState, selection)
  }

  const { startOffset, endOffset, startKey } = selection

  const blockToSplit = getBlockFor(editorState, startKey)

  if (blockToSplit == null) {
    return
  }

  const textBefore = blockToSplit.text.slice(0, startOffset)
  const textAfter = blockToSplit.text.slice(endOffset)

  const newBlock = createBlock({ ...blockToSplit, text: textAfter })

  updateBlock(editorState, blockToSplit.key, { text: textBefore })
  insertBlockAfter(editorState, newBlock)

  editorState.selection = {
    startKey: newBlock.key,
    endKey: newBlock.key,
    startOffset: 0,
    endOffset: 0
  }
}

export const updateBlock = (editorState: EditorState, key: string, blockUpdate: $Shape<Block>): void => {
  const keys = editorState.content.map(block => block.key)
  const blockIndex = keys.indexOf(key)

  editorState.content[blockIndex] = Object.assign(
    editorState.content[blockIndex],
    blockUpdate
  )
}

export const insertBlockBefore = (editorState: EditorState, block: Block): void => {
  const { content, selection } = editorState
  const keys = content.map(block => block.key)
  const blockIndex = keys.indexOf(selection.endKey)

  editorState.content = content.slice(0, blockIndex)
    .concat([block]).concat(content.slice(blockIndex))
}

export const insertBlockAfter = (editorState: EditorState, block: Block): void => {
  const { content, selection } = editorState
  const keys = content.map(block => block.key)
  const blockIndex = keys.indexOf(selection.endKey)

  editorState.content = content.slice(0, blockIndex + 1)
    .concat([block]).concat(content.slice(blockIndex + 1))
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
