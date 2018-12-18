// @flow

import React, { useContext } from 'react'
import EditorContext from './EditorContext'
import type { Block } from '../types'

type Props = {
  content?: Array<Block>
}

export default function EditorBlockChildren({
  content
}: Props) {
  const {
    block,
    editorState,
    renderFragment,
    renderBlock
  } = useContext(EditorContext)

  const EditorBlock = renderBlock

  const _children = content || block.children

  if (Array.isArray(_children)) {
    return _children.map(
      (child, index) => {
        const value = {
          editorState,
          renderFragment,
          renderBlock,
          block: child
        }

        return <EditorContext.Provider value={value}>
          <EditorBlock
            key={child.key}
            block={child}
            editorState={editorState}
            renderFragment={renderFragment}
          />
        </EditorContext.Provider>
      }
    )
  }

  return null
}
