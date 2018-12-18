// @flow

import type { EditorState, SelectionState, Block } from '../types'
import { getBlockListInRange } from '../queries'

export default function visitBlocks(
  editorState: EditorState,
  selection: SelectionState,
  blockUpdate: (block: Block) => void
) {
  getBlockListInRange(
    editorState.content,
    selection
  ).forEach(({ block }) => blockUpdate(block))
}
