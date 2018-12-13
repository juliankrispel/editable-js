// @flow

import React, { Fragment, Component, createRef } from 'react'
import type { Node, TextFragment } from 'react'
import produce from 'immer'

import { getDomSelection, setDomSelection } from '../selection'
import handleKeyDown from '../handleKeyDown'
import shallowEqual from '../shallowEqual'
import { createTextFragments } from '../create'
import type { EditorState, Block } from '../types'
import { getPreviousCharacterData } from '../queries'
import hasEqualCharacterData from '../hasEqualCharacterData'

type Props = {
  onChange: EditorState => void,
  editorState: EditorState,
  renderBlock?: ({ block: Block, children: Node }) => Node,
  renderFragment?: ({ fragment: TextFragment, children: Node }) => Node
}

const editorStyles = {
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word',
  userSelect: 'text',
  outline: 'none'
}

/*
const blockStyles = {
  outline: 'none',
  userSelect: 'text',
  whiteSpace: 'pre-wrap',
  display: 'block',
  position: 'relative',
  overflowWrap: 'break-word'
}
*/

export default class Editor extends Component<Props> {
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

  renderBlock = (block: Block): Node => {
    const { key, text, children } = block
    let textNode = text || <br />

    if (text != null && text.length > 0) {
      console.log('has text', text, 'boing')
      const fragments = createTextFragments(block, this.props.editorState.entityMap)

      let offset = 0

      textNode = fragments.map(fragment => {
        console.log('yo', fragment.text.length)
        let textFragment = <span
          data-block-key={key}
          data-fragment-start={offset}
          data-fragment-end={offset + fragment.text.length}
        >{fragment.text || <br />}</span>
        if (this.props.renderFragment) {
          textFragment = this.props.renderFragment({ children: textFragment, fragment })
        }
        offset += fragment.text.length
        return textFragment
      })
    } else {
      console.log('does not have text')
      textNode = <span
        data-block-key={key}
        data-fragment-start={0}
        data-fragment-end={0}
      ><br /></span>
    }

    let renderedChildren = null
    let renderedElement = null

    if (Array.isArray(children)) {
      renderedChildren = children.map(this.renderBlock)
    }

    if (typeof text === 'string') {
      renderedElement = <Fragment key={key}>
        <span>{textNode}</span>
        {renderedChildren}
      </Fragment>
    }

    if (this.props.renderBlock) {
      return this.props.renderBlock({ children: renderedElement, block })
    }

    return renderedElement
  }

  handleSelectionChange = (event: SyntheticMouseEvent<*>): void => {
    const { editorState, onChange } = this.props
    const { selection } = editorState
    const domSelection = getDomSelection(editorState)

    if (domSelection != null && !shallowEqual(selection, domSelection)) {
      onChange(produce(editorState, draft => {
        const previousCharacterData = getPreviousCharacterData(editorState.content, domSelection)

        if (!hasEqualCharacterData(previousCharacterData, editorState.currentCharacterData)) {
          draft.currentCharacterData = previousCharacterData
        }

        draft.selection = domSelection
      }))
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
      {content.map(this.renderBlock)}
    </div>
  }
}
