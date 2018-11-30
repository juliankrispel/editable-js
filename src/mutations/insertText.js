// @flow
import type { EditorState, SelectionState } from '../types'
import { getBlock } from '../queries'
import { isCollapsed } from '../selection'

export default function insertText(
  editorState: EditorState,
  selection: SelectionState,
  _text: string
) {
  if (!isCollapsed(selection)) {
    throw new Error('cannot insert text when selection is not collapsed')
  }

  const { startOffset, startKey } = selection

  const block = getBlock(editorState.content, startKey)

  if (block != null) {
    const { text } = block
    block.text = `${text.slice(0, startOffset)}${_text}${text.slice(startOffset)}`

    const offset = selection.startOffset + _text.length

    editorState.selection.startOffset = offset
    editorState.selection.endOffset = offset
  }
}
