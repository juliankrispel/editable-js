// @flow

import type { EditorState, Block } from '../types'
import { getBlock } from '../queries'

export default function updateBlock(
  editorState: EditorState,
  key: string,
  blockUpdate: $Shape<Block>
) {
  const block = getBlock(editorState.content, key)
  Object.assign(block, blockUpdate)
}
