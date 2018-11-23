// @flow

import type { EditorState } from '../../types'
import { getBlock } from '../queries'
import deleteBlock from './deleteBlock'

export default function mergeBlock(
  editorState: EditorState,
  blockKey: string,
  targetBlockKey: string
) {
  const { content } = editorState
  const block = getBlock(content, blockKey)
  const targetBlock = getBlock(content, targetBlockKey)

  if (targetBlock.children == null) {
    targetBlock.children = []
  }

  if (block.children != null) {
    targetBlock.children.splice(
      targetBlock.children.length,
      0,
      ...block.children
    )
  }

  targetBlock.text += block.text

  deleteBlock(editorState, blockKey)
}
