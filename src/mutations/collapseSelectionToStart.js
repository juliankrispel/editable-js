// @flow
import type { SelectionState } from './types'

export default function collapseSelectionToStart(selection: SelectionState) {
  selection.endOffset = selection.startOffset
  selection.endKey = selection.startKey
}
