// @flow

import produce from 'immer'
import type { RawContentState, EditorState } from './types'
import createBlock from './createBlock'

const emptyState = {
  content: [],
  selection: {
    startKey: 'a',
    endKey: 'a',
    startOffset: 0,
    endOffset: 0
  },
  changes: [],
  changeIndex: -1,
  lastCommitted: null
}

const createEditorState = (rawContent: RawContentState): EditorState => {
  const content = rawContent.map(createBlock)

  const key = content[0].key
  const selection = {
    startKey: key,
    endKey: key,
    startOffset: 0,
    endOffset: 0
  }

  const initialState = produce(emptyState,
    () => ({
      content,
      selection,
      changes: [],
      changeIndex: 0,
      lastCommitted: null
    }))

  return initialState
}

export default createEditorState