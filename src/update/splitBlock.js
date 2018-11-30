// @flow

import type { EditorState, SelectionState } from '../types'
import removeRange from './removeRange'
import { createBlock } from '../create'
import { getBlock } from '../queries'
import { isCollapsed } from '../selection'
import updateBlock from './updateBlock'
import insertBlockAfter from './insertBlockAfter'

export default function splitBlock(editorState: EditorState, selection: SelectionState): void {
  if (!isCollapsed(selection)) {
    removeRange(editorState, selection)
  }

  const { startOffset, endOffset, startKey } = selection

  const blockToSplit = getBlock(editorState.content, startKey)

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
