// @flow

import type { RawBlock, EditorState, SelectionState, Block } from './types'
import genId from './genId'

export const createBlock = (newBlock: RawBlock): Block => ({
  ...newBlock,
  key: genId()
})

export const insertText = (
  editorState: EditorState,
  text: string
): void => {
  const { selection } = editorState

  if (!isCollapsed(selection)) {
    throw new Error('cannot insert text when selection is not collapsed')
  }

  const { startOffset, startKey } = selection

  editorState.content.forEach(block => {
    if (block.key === startKey && typeof block.value === 'string') {
      const { value } = block
      block.value = `${value.slice(0, startOffset)}${text}${value.slice(startOffset)}`
    }
  })

  const offset = selection.startOffset + text.length

  editorState.selection.startOffset = offset
  editorState.selection.endOffset = offset
}

export const replaceText = (editorState: EditorState, selection: SelectionState, text: string): void => {
  removeRange(editorState, editorState.selection)
  insertText(editorState, text)
}

export const removeRange = (editorState: EditorState, selection: SelectionState): void => {
  const { content } = editorState
  const { startKey, endKey, startOffset, endOffset } = selection
  const keys = content.map(block => block.key)
  const startIndex = keys.indexOf(startKey)
  const endIndex = keys.indexOf(endKey)

  console.log('yo, selection', selection)

  if (selection.startKey === selection.endKey) {
    const { value } = content[startIndex]
    content[startIndex].value = value.slice(0, startOffset) + value.slice(endOffset)
  } else {
    content[startIndex].value = content[startIndex].value.slice(0, startOffset) + content[endIndex].value.slice(endOffset)
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

  const textBefore = blockToSplit.value.slice(0, startOffset)
  const textAfter = blockToSplit.value.slice(endOffset)

  const newBlock = createBlock({ ...blockToSplit, value: textAfter })

  updateBlock(editorState, blockToSplit.key, { value: textBefore })
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
