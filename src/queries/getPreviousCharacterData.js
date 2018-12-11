// @flow

import type { CharacterData, ContentState, SelectionState } from '../types'
import getBlock from './getBlock'

export default function getPreviousCharacterData(
  content: ContentState,
  selection: SelectionState
): ?CharacterData {
  const key = selection.startKey
  const block = getBlock(content, key)

  if (block != null) {
    return block.characterData[selection.startOffset - 1]
  }

  return null
}
