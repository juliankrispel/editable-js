// @flow

import React, { Component, createRef } from 'react'
import { getSelection, setDomSelection } from './lib'
import { handleKeyDown } from './handlers'
import type { EditorState, Leaf } from './types'

type Props = {
  onChange: EditorState => void,
  editorState: EditorState
}

const renderLeaf = ({ key, value, data }: Leaf) => {
  if (typeof value === 'string') {
    return <div key={key} data-leaf-key={key}>{value}</div>
  } else if (Array.isArray(value)) {
    return <div key={key} data-leaf-key={key}>{value.map(renderLeaf)}</div>
  } else {
    throw new Error(`leaf value not implemented ${JSON.stringify(value, null, 2)}`)
  }
}

export class Editor extends Component<Props> {
  ref = createRef()

  onKeyDown = (event: SyntheticKeyboardEvent<*>): void => {
    event.preventDefault()
    const { editorState, onChange } = this.props
    onChange(handleKeyDown(editorState, event))
  }

  componentDidUpdate() {
    const { editorState } = this.props
    if (editorState.selection != null && this.ref.current != null) {
      setDomSelection(this.ref.current, this.props.editorState.selection)
    }
  }

  onMouseUp = (event: SyntheticMouseEvent<*>): void => {
    this.props.onChange({
      ...this.props.editorState,
      selection: getSelection(this.props.editorState)
    })
  }

  render() {
    const { editorState: { content } } = this.props

    return <div
      ref={this.ref}
      onMouseUp={this.onMouseUp}
      suppressContentEditableWarning
      contentEditable
      onKeyDown={this.onKeyDown}>
      {content.map(renderLeaf)}
    </div>
  }
}
