// @flow

import type { EditorState, SelectionState, RawBlock } from '../types'
import { getBlockListInRange, getBlockBefore } from '../queries'
import { createBlock } from '../create'
import deleteBlock from './deleteBlock'
import insertBlockAfter from './insertBlockAfter'

export default function wrapRange(
  editorState: EditorState,
  selection: SelectionState,
  block: RawBlock
) {
  const blockList = getBlockListInRange(
    editorState.content,
    selection
  )
  const blocks = blockList.map(({ block }) => block)
  const blockBefore = getBlockBefore(editorState.content, selection.startKey)
  const newBlock = createBlock(block)
  newBlock.children = blocks

  blockList.forEach(({ block: { key } }) => deleteBlock(editorState, key))
  insertBlockAfter(editorState, blockBefore.key, newBlock)
}
