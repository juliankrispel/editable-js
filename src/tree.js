// @flow
import type { ContentState, Block } from './types'

export const flattenTree = (content: ContentState): Array<Block> => {
  let blocks = []

  content.forEach((block) => {
    blocks.push(block)
    if (Array.isArray(block.children)) {
      blocks = blocks.concat(flattenTree(block.children))
    }
  })

  return blocks
}
