// @flow
import type { ContentState, EditorState, SelectionState, Block } from './types'

import { flattenTree } from './tree'

export const getBlockByKey = (editorState: EditorState, key: string) =>
  flattenTree(editorState.content).find(block => block.key === key)

export const getChildrenKeys = (block: Block): Array<string> =>
  (block.children || []).map(block => block.key)

export const hasChild = (
  block: Block,
  key: string
): boolean =>
  getChildrenKeys(block).some(blockKey === key)

export const getBlockByPath = (
  obj: ContentState
  path: Array<number>
): ?Block =>
  path.reduce((obj, index) => Array.isArray(obj) ? obj[index] : obj.children[index], obj)

// export const getBlocksFromSelection = (content: ContentState, selection: SelectionState) => {
//   let blocks = []
// }

// export const getParentBlock = (block: Block, key: string): ?Block => {
// }

type FlattenedBlocks = Array<{
  key: key,
  path: Array<string|number>,
  block: Block
}>

export const getBlockPaths = (content: ContentState, path = []) => {
  return contentState.reduce(
    (acc, block, index) => {
      let { children = [] } = block

      return [
        ...acc,
        {
          key: block.key,
          path: path.concat([index]),
          block,
        },
        ...children.map((block, index) => getBlockPaths(block, path.concat([index])))
      ]
    }, [])
}

