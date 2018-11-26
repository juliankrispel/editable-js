// @flow

import type { EditorState } from '../../types'
import { getBlockParent } from '../queries'

export default function updateBlock(
  editorState: EditorState,
  key: string,
  blockUpdate: $Shape<Block>
) {
  const { content } = editorState

  const rootIndex = content.map(block => block.key).indexOf(key)

  // if block is root block, just splice it
  if (rootIndex > -1) {
    Object.assign(editorState.content[rootIndex], blockUpdate)
  } else {
    const parent = getBlockParent(content, key)

    if (parent == null) {
      return
    }

    const index = parent.children.map(
      block => block.key
    ).indexOf(key)

    Object.assign(parent.children[index], blockUpdate)
  }
}
