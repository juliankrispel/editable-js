// @flow

import type { EditorState, SelectionState, CharacterData } from '../types'
import { getCharacterDataInRange } from '../queries'

export default function updateCharacterData(
  editorState: EditorState,
  selection: SelectionState,
  update: (data: CharacterData) => void
) {
  getCharacterDataInRange(editorState.content, selection).forEach(update)
}
