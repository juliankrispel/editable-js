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

  let blockMap
  if (Array.isArray(content)) {
    blockMap = getBlockMap(content)
  } else if (content.children != null) {
    blockMap = getBlockMap(content.children)
  }

  if (blockMap != null) {
    return blockMap.hasOwnProperty(key)
  }

  return false
}
