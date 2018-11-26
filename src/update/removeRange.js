// @flow
import type { SelectionState } from '../types'
import { getBlockListInRange } from '../queries'
import updateBlock from './updateBlock'

export default function removeRange(
  editorState: EditorState,
  selection: SelectionState
) {
  if (
    selection.startKey === selection.endKey &&
    selection.startOffset !== selection.endOffset
  ) {
    updateBlock(
      editorState,
      selection.startKey,

    )
  }

  // 1. get block list by selection
  const blockList = getBlockListInRange(editorState.content, selection)


  if (blockList.length > 1) {
  }

  // 3. collapse blocks in between start and end key in reverse

}
