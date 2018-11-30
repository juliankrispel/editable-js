// @flow

import type { SelectionState } from '../types'

export default function isCollapsed(selection: SelectionState): boolean {
  return selection.startOffset === selection.endOffset &&
    selection.startKey === selection.endKey
}
