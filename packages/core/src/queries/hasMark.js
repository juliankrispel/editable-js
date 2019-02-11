// @flow

import type { ContentState, SelectionState } from '../types'
import getCharacterDataInRange from './getCharacterDataInRange'

export default function (
  content: ContentState,
  selection: SelectionState,
  mark: string
): boolean {
  return getCharacterDataInRange(content, selection).some(data => data.marks.includes(mark))
}
