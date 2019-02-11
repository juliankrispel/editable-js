// @flow

import type { EditorState, SelectionState } from '../types'
import { hasBlockType } from '../queries'
import visitBlocks from './visitBlocks'

export default function toggleBlockType(
  editorState: EditorState,
  selection: SelectionState,
  type: string
) {
  const hasType = hasBlockType(editorState.content, selection, type)

  visitBlocks(
    editorState,
    selection,
    (block) => {
      if (hasType) {
        delete block.type
      } else {
        block.type = type
      }
    }
  )
}
