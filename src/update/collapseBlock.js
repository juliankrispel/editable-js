// @flow

import type { EditorState } from '../../types'
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

  const index = parent.children.map(
    block => block.key
  ).indexOf(key)

  const blockToCollapse = parent.children[index]

  if (blockToCollapse.children) {
    parent.children.splice(
      index,
      1,
      ...blockToCollapse.children
    )
  } else {
    parent.children.splice(index, 1)
  }
}
