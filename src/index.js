// @flow

import React, { Component, createRef } from 'react'
import type { Node } from 'react'

import { getDomSelection, setDomSelection } from './selection'
import handleKeyDown from './handleKeyDown'
import { createEditorState } from './create'
import shallowEqual from './shallowEqual'
import type { EditorState, Block } from './types'

type Props = {
  onChange: EditorState => void,
  editorState: EditorState
}

const editorStyles = {
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word',
  userSelect: 'text',
  outline: 'none'
}

const blockStyles = {
  outline: 'none',
  userSelect: 'text',
  whiteSpace: 'pre-wrap',
  display: 'block',
  position: 'relative',
  overflowWrap: 'break-word'
}

const renderBlock = ({ key, text, data, children }: Block): Node => {
  const textNode = text || <br />

  let renderedChildren = null

  if (Array.isArray(children)) {
    renderedChildren = children.map(renderBlock)
  }

  if (typeof text === 'string') {
    return <div style={blockStyles} key={key} data-block-key={key}>
      <span>{textNode}</span>
      {renderedChildren}
    </div>
  }

  return null
}

class Editor extends Component<Props> {
  ref = createRef()

  onKeyDown = (event: SyntheticKeyboardEvent<*>): void => {
    const { editorState, onChange } = this.props
    onChange(handleKeyDown(editorState, event))
  }

  componentDidUpdate() {
    const { editorState } = this.props
    if (editorState.selection != null && this.ref.current != null) {
      setDomSelection(this.ref.current, this.props.editorState.selection)
    } else {
      console.log('editor selection is null')
    }
  }

  handleSelectionChange = (event: SyntheticMouseEvent<*>): void => {
    const { editorState, onChange } = this.props
    const { selection } = editorState
    const domSelection = getDomSelection(editorState)

    if (domSelection != null && !shallowEqual(selection, domSelection)) {
      onChange({
        ...editorState,
        selection: domSelection
      })
    }
  }

  render() {
    const { editorState: { content } } = this.props

    return <div
      ref={this.ref}
      style={editorStyles}
      onMouseUp={this.handleSelectionChange}
      suppressContentEditableWarning
      contentEditable
      onSelect={this.handleSelectionChange}
      onKeyDown={this.onKeyDown}>
      {content.map(renderBlock)}
    </div>
  }
}

export { createEditorState, Editor }
