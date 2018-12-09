// @flow

import produce, { applyPatches } from 'immer'
import type { EditorState } from '../types'

const undo = (editorState: EditorState): EditorState => {
  const { changeIndex, changes } = editorState
  if (changeIndex > 0) {
    let newState = applyPatches(editorState, changes[changeIndex - 1].reverse)
    return produce(newState, draft => { draft.changeIndex-- })
  } else {
    return editorState
  }
}

export default undo
