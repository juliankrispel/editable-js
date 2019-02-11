// @flow

import produce, { applyPatches } from 'immer'

import undo from './undo'
import type { EditorState } from '../types'

const mergeLastCommit = (editorState: EditorState) => {
  const prevEditorState = undo(undo(editorState, true), true)
  let changes = { forward: [], reverse: [] }
  const lastTwoChanges = editorState.changes.slice(-2)

  const newEditorState = produce(
    prevEditorState,
    draft => {
      lastTwoChanges.forEach(change => {
        // console.log('change', JSON.stringify(change))
        applyPatches(draft, change.forward)
      })
    }, (forward, reverse) => {
      changes = {forward, reverse}
    }
  )

  return produce(
    newEditorState,
    draft => {
      draft.changes.pop()
      draft.changes[draft.changes.length - 1] = changes
      draft.changeIndex = draft.changes.length
    }, () => {}
  )
}

const commit = (
  editorState: EditorState,
  update: (EditorState, ...args:Array<any>) => void,
  ...rest: Array<any>
) => {
  let changes = { forward: [], reverse: [] }

  const { lastCommitted } = editorState

  let newEditorState = produce(
    editorState,
    draft => {
      update(draft, ...rest)
    },
    (forward, reverse) => {
      changes = { forward, reverse }
    }
  )

  newEditorState = produce(
    newEditorState,
    draft => {
      const { changeIndex } = draft

      draft.changeIndex++

      if (draft.changes.length > changeIndex) {
        draft.changes = draft.changes.slice(0, changeIndex - 1)
      }

      draft.changes.push(changes)

      draft.lastCommitted = update.name
    }
  )

  if (lastCommitted === update.name) {
    newEditorState = mergeLastCommit(newEditorState)
  }

  return newEditorState
}

export default commit
