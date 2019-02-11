// @flow

import type { EditorState, CharacterData } from '../types'

export default function setCurrentCharacterData(editorState: EditorState, data: CharacterData) {
  editorState.currentCharacterData = data
}
