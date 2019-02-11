// @flow

import { getBlockBefore } from '../queries'
import { isCollapsed } from '../selection'
import { removeRange } from '../mutations'

import type { EditorState } from '../types'

export default function handleBackspace (editorState: EditorState) {
  let { selection } = editorState

  if (!isCollapsed(selection)) {
    removeRange(editorState, selection)
    return
  }

  const blockBefore = getBlockBefore(editorState.content, selection.startKey)

  if (selection.startOffset > 0) {
    selection = {
      ...selection,
      startOffset: selection.startOffset - 1
    }
  } else if (blockBefore != null) {
    selection = {
      ...selection,
      startKey: blockBefore.key,
      startOffset: blockBefore.text.length
    }
  } else {
    return
  }

  removeRange(editorState, selection)
}
