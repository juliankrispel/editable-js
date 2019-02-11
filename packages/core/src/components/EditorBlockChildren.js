// @flow

import React, { useContext } from 'react'
import EditorContext from './EditorContext'
import type { RenderFragment, RenderBlock, Block } from '../types'

type Props = {
  content?: Array<Block>,
  renderFragment?: RenderFragment,
  renderBlock: RenderBlock
}

export default function EditorBlockChildren({
  content,
  ...props
}: Props) {
  const {
    block,
    editorState,
    ...contextProps
  } = useContext(EditorContext)

  const renderFragment = props.renderFragment || contextProps.renderFragment
  const renderBlock = props.renderBlock || contextProps.renderBlock

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
