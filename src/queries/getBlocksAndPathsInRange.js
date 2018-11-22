// @flow

import type { BlocksAndPaths, ContentState, SelectionState } from '../types'
import getBlocksAndPaths from './getBlocksAndPaths'

export default function(
  content: ContentState,
  selection: SelectionState
): BlocksAndPaths {
  const blockMap = getBlocksAndPaths(content)
  return .filter()

}
