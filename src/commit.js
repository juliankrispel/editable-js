// @flow

import produce from 'immer'

import type { EditorState } from './types'

const commit = (
  editorState: EditorState,
  update: EditorState => void,
  ...rest
) => {
  let changes = {}

  let newEditorState = produce(
    editorState,
    draft => { update(draft, ...rest) },
    (redo, undo) => {
      changes = { redo, undo }
    }
  )

  newEditorState = produce(
    newEditorState,
    draft => {
      draft.changes.push(changes)
    }
  )

  return newEditorState
}

export default commit
