// @flow

import { isCollapsed } from '../selection'
import { removeRange } from '../mutations'

import type { EditorState } from '../types'

export default function handleBackspaceLine (editorState: EditorState) {
  if (!isCollapsed(editorState.selection)) {
    throw new Error('handleBackspaceWord only handles collapsed selections')
  }

  const selection = {
    ...editorState.selection,
    startOffset: 0
  }

  removeRange(
    editorState,
    selection
  )
}
