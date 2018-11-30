// @flow

import type { EditorState, SelectionState } from '../types'
import removeRange from './removeRange'
import { getBlock } from '../queries'
import { isCollapsed } from '../selection'
import { createBlock } from '../create'
import updateBlock from './updateBlock'
import insertBlockAfter from './insertBlockAfter'

export default function splitBlock(editorState: EditorState, selection: SelectionState): void {
  if (!isCollapsed(selection)) {
    removeRange(editorState, selection)
  }

  // console.log('editorState after remove range', editorState)
  const { content } = editorState
  const { startOffset, endOffset, startKey } = selection

  const blockToSplit = getBlock(content, startKey)

  if (blockToSplit == null) {
    return
  }

  const textBefore = blockToSplit.text.slice(0, startOffset)
  const textAfter = blockToSplit.text.slice(endOffset)

  const newBlock = createBlock({ ...blockToSplit, key: null, text: textAfter })

  updateBlock(editorState, blockToSplit.key, { text: textBefore, children: [] })
  insertBlockAfter(editorState, blockToSplit.key, newBlock)

  editorState.selection = {
    startKey: newBlock.key,
    endKey: newBlock.key,
    startOffset: 0,
    endOffset: 0
  }
}
