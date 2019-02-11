// @flow

import type { Block, ContentState } from '../types'
import getBlockMap from './getBlockMap'

export default function getBlockAfter(
  content: ContentState,
  key: string
): ?Block {
  const blockMap = getBlockMap(content)
  const keys = Object.keys(blockMap)
  const blockIndex = keys.indexOf(key)

  if (blockIndex < 0) {
    return null
  }

  const block = blockMap[keys[blockIndex + 1]]

  if (block != null) {
    return block.block
  }

  return null
}
