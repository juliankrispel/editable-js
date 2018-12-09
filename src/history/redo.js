// @flow

import produce, { applyPatches } from 'immer'
import type { EditorState } from '../types'

const redo = (editorState: EditorState): EditorState => {
  const { changeIndex, changes } = editorState
  if (changes[changeIndex] != null) {
    let newState = applyPatches(editorState, changes[changeIndex].forward)
    return produce(newState, draft => {
      draft.lastCommitted = 'redo'
      draft.changeIndex++
    })
  } else {
    return editorState
  }
}

export default redo
