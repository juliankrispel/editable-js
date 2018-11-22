// @flow
import type { SelectionState } from '../../types'

export default function removeRange(
  editorState: EditorState,
  selection: SelectionState
) {
  // get list of selected blocks as array
  const blocks = getBlocksBySelection(editorState, selection)


  // collapse
  blocks.filter(![selection.startKey, selection.endKey].includes(block.key))
    .forEach(block => collapseBlock(editorState, block.key))

  // get end block and merge it with first block

  // insert children of last block at start


  // reverse

  // loop over block array

  // for all children that are enclosed by selection delete
  // and fold children into parent

  // traverse blocks
  editorState.content.map(
  )
}
