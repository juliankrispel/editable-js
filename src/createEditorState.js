// @flow

import genId from './genId'
import type { RawContentState, EditorState } from './types'

const createEditorState = (rawContent: RawContentState): EditorState => {
  const content = rawContent.map(block => ({
    ...block,
    key: genId()
  }))

  const key = content[0].key
  const selection = {
    startKey: key,
    endKey: key,
    startOffset: 0,
    endOffset: 0
  }

  return {
    content,
    selection,
    patches: []
  }
}

export default createEditorState
