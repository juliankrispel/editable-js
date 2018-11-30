// @flow
import type { EditorState, Block } from '../types'

export const insertBlockBefore = (editorState: EditorState, block: Block): void => {
  const { content, selection } = editorState
  const keys = content.map(block => block.key)
  const blockIndex = keys.indexOf(selection.endKey)

  editorState.content = content.slice(0, blockIndex)
    .concat([block]).concat(content.slice(blockIndex))
}
