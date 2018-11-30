// @flow
import type { EditorState, Block } from '../types'

export default function insertBlockAfter(editorState: EditorState, block: Block): void {
  const { content, selection } = editorState
  const keys = content.map(block => block.key)
  const blockIndex = keys.indexOf(selection.endKey)

  editorState.content = content.slice(0, blockIndex + 1)
    .concat([block]).concat(content.slice(blockIndex + 1))
}
