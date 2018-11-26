// @flow

import type { Block, ContentState } from '../types'
import getBlockMap from './getBlockMap'

export default function hasDescendant(
  content: ContentState | Block,
  key: string
): boolean {
  if (content == null) {
    return false
  }

  const blockMap = Array.isArray(content)
    ? getBlockMap(content)
    : getBlockMap(content.children)

  if (blockMap != null) {
    return blockMap.hasOwnProperty(key)
  }

  return false
}
