// @flow

import type { EditorState } from '../types'
import { getBlockParent } from '../queries'

export default function collapseBlock(
  editorState: EditorState,
  key: string
) {
  // get parent
  const { content } = editorState
  const parent = getBlockParent(content, key)

  if (parent == null) {
    return
  }

  const { children } = parent

  if (children) {
    const index = children.map(
      block => block.key
    ).indexOf(key)

    const blockToCollapse = children[index]

    if (blockToCollapse.children) {
      children.splice(
        index,
        1,
        ...blockToCollapse.children
      )
    } else {
      children.splice(index, 1)
    }
  }
}
