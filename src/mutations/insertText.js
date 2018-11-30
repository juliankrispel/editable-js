// @flow
import type { EditorState } from './types'
import { getBlock } from '../queries'
import { isCollapsed } from '../selection'

export default function insertText(
  editorState: EditorState,
  _text: string
): void {
  const { selection } = editorState

  if (!isCollapsed(selection)) {
    throw new Error('cannot insert text when selection is not collapsed')
  }

  const { startOffset, startKey } = selection

  const block = getBlock(editorState.content, startKey)
  const { text } = block
  block.text = `${text.slice(0, startOffset)}${_text}${text.slice(startOffset)}`

  const offset = selection.startOffset + _text.length

  editorState.selection.startOffset = offset
  editorState.selection.endOffset = offset
}
