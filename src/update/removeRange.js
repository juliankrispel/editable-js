// @flow
import type { SelectionState } from '../../types'
import { getBlockListInRange } from '../queries'

export default function removeRange(
  editorState: EditorState,
  selection: SelectionState
) {
  // 1. get block list by selection
  const blockList = getBlockListInRange(editorState.content, selection)

  // 2. merge last into first block

  // 3. collapse blocks in between start and end key in reverse

}
