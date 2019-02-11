// @flow

import type { Block, ContentState } from '../types'
import getBlockMap from './getBlockMap'

export default function getBlockBefore(
  content: ContentState,
  key: string
): ?Block {
  const blockMap = getBlockMap(content)
  const keys = Object.keys(blockMap)
  const blockIndex = keys.indexOf(key)
  const block = blockMap[keys[blockIndex - 1]]

  if (block != null) {
    return block.block
  }

  return null
}
