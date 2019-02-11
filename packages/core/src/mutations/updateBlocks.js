// @flow

import type { EditorState, SelectionState, Block } from '../types'
import { getBlockListInRange } from '../queries'

export default function updateBlocks(
  editorState: EditorState,
  selection: SelectionState,
  targetBlockKey: string,
  blockUpdate: $Shape<Block>
) {
  getBlockListInRange(
    editorState.content,
    selection
  ).forEach(({ block }) => Object.assign(block, blockUpdate))
}
