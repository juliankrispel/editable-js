// @flow

import { createContext } from 'react'

type EditorContextType = {
  block: ?Block,
  editorState: ?EditorState,
  renderFragment: ?RenderFragment,
  renderBlock: ?RenderBlock,
}

const EditorContext: EditorContextType = createContext({
  editorState: null,
  block: null,
  renderFragment: null,
  renderBlock: null
})

export default EditorContext
