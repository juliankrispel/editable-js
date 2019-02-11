// @flow

import type { EditorState, Block } from '../types'
import { getBlock } from '../queries'

export default function visitBlock(
  editorState: EditorState,
  key: string,
  blockUpdate: (block: Block) => void
) {
  const block = getBlock(editorState.content, key)

  if (block != null) {
    blockUpdate(block)
  }
}
