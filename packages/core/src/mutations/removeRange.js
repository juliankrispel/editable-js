// @flow
import type { EditorState, SelectionState } from '../types'
import { getBlockListInRange, getBlock } from '../queries'
import mergeBlock from './mergeBlock'
import collapseSelectionToStart from './collapseSelectionToStart'
import collapseBlock from './collapseBlock'

export default function removeRange(
  editorState: EditorState,
  selection: SelectionState
) {
  const startBlock = getBlock(editorState.content, selection.startKey)

  if (
    startBlock != null &&
    selection.startKey === selection.endKey &&
    selection.startOffset !== selection.endOffset
  ) {
    const text = startBlock.text.slice(0, selection.startOffset) +
          startBlock.text.slice(selection.endOffset, startBlock.text.length)

    startBlock.text = text
    const length = selection.endOffset - selection.startOffset
    startBlock.characterData.splice(selection.startOffset, length)

    Object.assign(editorState.selection, selection)
    collapseSelectionToStart(editorState)

    return
  }

  // 1. get block list by selection
  const blockList = getBlockListInRange(editorState.content, selection)

  const first = blockList[0]
  const last = blockList.slice(-1)[0]
  const between = blockList.slice(1, -1)

  // 2. Delete Selected text
  last.block.text = last.block.text.slice(selection.endOffset)
  last.block.characterData.splice(0, selection.endOffset)
  first.block.text = first.block.text.slice(0, selection.startOffset)
  first.block.characterData.splice(selection.startOffset)

  // 3. Merge first and last item
  if (blockList.length > 1) {
    mergeBlock(
      editorState,
      last.key,
      first.key
    )
  }

  // 4. collapse blocks in between start and end key in reverse
  between.reverse().forEach(block => collapseBlock(editorState, block.key))

  // 5. Clean up selection
  Object.assign(editorState.selection, selection)
  collapseSelectionToStart(editorState)
}
