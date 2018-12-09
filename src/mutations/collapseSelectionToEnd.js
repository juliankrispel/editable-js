// @flow
import type { EditorState } from '../types'

export default function collapseSelectionToEnd(editorState: EditorState) {
  editorState.selection.startOffset = editorState.selection.endOffset
  editorState.selection.startKey = editorState.selection.endKey
}
