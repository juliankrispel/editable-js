// @flow

import type { Block, ContentState } from '../types'
import getBlockMap from './getBlockMap'

export default function hasDescendant(
  content: ContentState | Block,
  key: string
): boolean {
  if (
    content == null ||
    content.children == null ||
    content.children.length === 0
  ) {
    return false
  }

  const blockMap = Array.isArray(content)
    ? getBlockMap(content)
    : getBlockMap(content.children)

  if (blockMap != null) {
    return blockMap[key] != null
  }

  return false
}
