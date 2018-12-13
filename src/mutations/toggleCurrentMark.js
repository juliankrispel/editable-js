// @flow

import type { EditorState } from '../types'
import { isCollapsed } from '../selection'
import updateCharacterData from './updateCharacterData'
import { hasMark } from '../queries'

export default function toggleCurrentMark(editorState: EditorState, mark: string) {
  const data = editorState.currentCharacterData

  if (isCollapsed(editorState.selection)) {
    if (data == null) {
      editorState.currentCharacterData = {
        marks: [mark]
      }
    } else {
      if (data.marks.includes(mark)) {
        data.marks = data.marks.filter(_mark => _mark !== mark)
      } else {
        data.marks.push(mark)
      }
    }
  } else {
    const _hasMark = hasMark(editorState.content, editorState.selection, mark)
    updateCharacterData(editorState, editorState.selection, data => {
      if (_hasMark) {
        data.marks = data.marks.filter(_mark => _mark !== mark)
      } else {
        data.marks.push(mark)
      }
    })
  }
}
