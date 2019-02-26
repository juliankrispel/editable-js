// @flow

import type { BlockList, ContentState } from '../types'
import getBlockMap from './getBlockMap'
import keys from '../keys'

// TODO - memoize - this will be used a lot
export default function getBlockList(
  content: ContentState
  // Only used to accumulate the path
): BlockList {
  const blockMap = getBlockMap(content)

  return keys(blockMap).map(key => ({
    key,
    block: blockMap[key].block,
    path: blockMap[key].path
  }))
}
