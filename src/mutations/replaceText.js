// @flow
import type { EditorState, SelectionState } from '../types'
import removeRange from './removeRange'
import insertText from './insertText'

export default function replaceText(editorState: EditorState, selection: SelectionState, text: string): void {
  removeRange(editorState, editorState.selection)
  insertText(editorState, editorState.selection, text)
}
