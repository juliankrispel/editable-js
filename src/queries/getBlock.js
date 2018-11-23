// @flow

import type { Block, ContentState } from '../types'
import getBlockMap from './getBlockMap'

export default function getBlock(
  content: ContentState,
  key: string
): ?Block {
  const block = getBlockMap(content)[key]

  if (block != null) {
    return block.block
  }

  return null
}
