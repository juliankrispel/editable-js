// @flow

import type { EditorState } from '../types'
import { getBlock, hasDescendant } from '../queries'
import deleteBlock from './deleteBlock'

export default function mergeBlock(
  editorState: EditorState,
  blockKey: string,
  targetBlockKey: string
) {
  const { content } = editorState
  const block = getBlock(content, blockKey)
  const targetBlock = getBlock(content, targetBlockKey)

  if (block == null) {
    throw new Error('block does not exist')
  }

  if (targetBlock == null) {
    throw new Error('target block does not exist')
  }

  if (hasDescendant(block, targetBlockKey)) {
    throw new Error('Cannot merge block into descending block')
  }

  if (targetBlock.children == null) {
    targetBlock.children = []
  }

  if (block.children != null) {
    targetBlock.children.splice(
      0,
      0,
      ...block.children
    )
  }

  targetBlock.text += block.text

  deleteBlock(editorState, blockKey)
}
