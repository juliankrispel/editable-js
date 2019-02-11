// @flow

import produce, { applyPatches } from 'immer'
import type { EditorState } from '../types'

const undo = (editorState: EditorState, suppressCommit?: boolean): EditorState => {
  const { changeIndex, changes } = editorState

  if (changeIndex > 0) {
    let newState = applyPatches(editorState, changes[changeIndex - 1].reverse)

    return produce(newState, draft => {
      if (!suppressCommit) {
        draft.lastCommitted = 'undo'
      }
      draft.changeIndex--
    })
  } else {
    return editorState
  }
}

export default undo
