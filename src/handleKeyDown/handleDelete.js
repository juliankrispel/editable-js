// @flow

import { getBlockAfter, getBlock } from '../queries'
import { isCollapsed } from '../selection'
import { removeRange } from '../mutations'

import type { EditorState } from '../types'

export default function handleDelete (editorState: EditorState) {
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
