// @flow

import type { EditorState, SelectionState } from '../types'

export default function updateSelection(editorState: EditorState, update: $Shape<SelectionState>) {
  Object.assign(
    editorState.selection,
    update
  )
}
