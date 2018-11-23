// @flow

import type { BlockMap, ContentState, SelectionState } from '../types'
import getBlockMap from './getBlockMap'

export default function getBlockMapInRange(
  content: ContentState,
  selection: SelectionState
): BlockMap {
  const blockMap = getBlockMap(content)
  const keys = Object.keys(blockMap)
  const startIndex = keys.indexOf(selection.startKey)
  const endIndex = keys.indexOf(selection.endKey)

  return keys
    .filter((key, keyIndex) => keyIndex >= startIndex && keyIndex <= endIndex)
    .reduce((acc, key) => ({
      ...acc,
      [key]: blockMap[key]
    }), {})
}
