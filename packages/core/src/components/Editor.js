// @flow

import React, { Fragment, Component, createRef } from 'react'
import type { Node } from 'react'
import produce from 'immer'

import EditorContext from './EditorContext'
import { getDomSelection, setDomSelection } from '../selection'
import handleKeyDown from '../handleKeyDown'
import shallowEqual from '../shallowEqual'
import { createTextFragments } from '../create'
import type {
  RenderFragment,
  RenderBlock,
  EditorState,
  Block
} from '../types'
import { getPreviousCharacterData } from '../queries'
import hasEqualCharacterData from '../hasEqualCharacterData'
import EditorBlockChildren from './EditorBlockChildren'
import EditorBlock from './EditorBlock'

type Props = {
  onChange: EditorState => void,
  editorState: EditorState,
  renderBlock?: RenderBlock,
  renderFragment?: RenderFragment
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

  static defaultProps = {
    renderBlock: EditorBlock
  }

  onKeyDown = (event: SyntheticKeyboardEvent<*>): void => {
    const { editorState, onChange } = this.props
    onChange(handleKeyDown(editorState, event))
  }

  componentDidUpdate() {
    const { editorState } = this.props
    if (editorState.selection != null && this.ref.current != null) {
      setDomSelection(this.ref.current, editorState.selection)
    }
  }

  renderBlock = (block: Block): Node => {
    const { key, text, children } = block
    let textNode = text || <br />

    if (text != null && text.length > 0) {
      const fragments = createTextFragments(block, this.props.editorState.entityMap)

      let offset = 0

      textNode = fragments.map(fragment => {
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
    const { editorState } = this.props

    if (!editorState) {
      throw new Error('editorState prop must be defined')
    }

    const content = editorState.content

    const contextProps = {
      editorState: this.props.editorState,
      renderFragment: this.props.renderFragment,
      renderBlock: this.props.renderBlock
    }

    return <EditorContext.Provider
      value={contextProps}>
      <div
        ref={this.ref}
        style={editorStyles}
        onMouseUp={this.handleSelectionChange}
        suppressContentEditableWarning
        contentEditable
        onSelect={this.handleSelectionChange}
        onKeyDown={this.onKeyDown}>
        <EditorBlockChildren content={content} />
      </div>
    </EditorContext.Provider>
  }
}
