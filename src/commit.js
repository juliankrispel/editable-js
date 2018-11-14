// @flow

import produce from "immer"

import type { EditorState } from './types'

const commit = (
  editorState: EditorState,
  update: EditorState => EditorState
) => {
  produce(editorState, update)
}

