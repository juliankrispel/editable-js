// @flow

import type { Block, ContentState } from '../types'
import getBlockMap from './getBlockMap'
import getBlockByPath from './getBlockByPath'

export default function getBlockParent(
  content: ContentState,
  key: string
): ?Block {
  const blockMap = getBlockMap(content)
  const blockInfo = blockMap[key]

  if (blockInfo == null || blockInfo.path.length < 2) {
    return null
  }

  return getBlockByPath(content, blockInfo.path.slice(0, -1))
}
