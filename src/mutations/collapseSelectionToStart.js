// @flow
import type { EditorState } from '../types'

export default function collapseSelectionToStart(editorState: EditorState) {
  editorState.selection.endOffset = editorState.selection.startOffset
  editorState.selection.endKey = editorState.selection.startKey
}
