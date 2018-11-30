// @flow
import type { EditorState, Block } from '../types'
import { getBlockParent } from '../queries'

export default function insertBlockAfter(
  editorState: EditorState,
  blockKey: string,
  block: Block
) {
  const rootIndex = editorState.content.map(block => block.key).indexOf(blockKey)
  const parent = getBlockParent(editorState.content, blockKey)

  if (rootIndex > -1) {
    editorState.content.splice(rootIndex + 1, 0, block)
  } else if (parent != null) {
    const blockIndex = parent.children.map(block => block.key).indexOf(blockKey)
    parent.children.splice(blockIndex + 1, 0, block)
  }
}
