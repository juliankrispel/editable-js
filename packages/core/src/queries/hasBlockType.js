// @flow

import type { ContentState, SelectionState } from '../types'
import getBlockListInRange from './getBlockListInRange'

export default function hasBlockType(
  content: ContentState,
  selection: SelectionState,
  type: string
): boolean {
  return getBlockListInRange(content, selection).some(
    ({ block }) => block.type === type
  )
}
