// @flow

import type { BlockList, ContentState, SelectionState } from '../types'
import getBlockMap from './getBlockMap'

export default function getBlockListInRange(
  content: ContentState,
  selection: SelectionState
): BlockList {
  const blockMap = getBlockMap(content)
  const keys = Object.keys(blockMap)
  const startIndex = keys.indexOf(selection.startKey)
  const endIndex = keys.indexOf(selection.endKey)

  return keys
    .filter((key, keyIndex) => keyIndex >= startIndex && keyIndex <= endIndex)
    .reduce((acc, key) => ([
      ...acc,
      {
        ...blockMap[key],
        key
      }
    ]), [])
}
