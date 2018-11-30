// @flow
import type { SelectionState } from './types'

export default function collapseSelectionToEnd(selection: SelectionState) {
  selection.startOffset = selection.endOffset
  selection.startKey = selection.endKey
}
