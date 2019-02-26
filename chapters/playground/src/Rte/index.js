import React, { Component } from 'react'
import {
  Editor,
  EditorBlockChildren,
  EditorText,
  createEditorState
} from 'zettel'
import MarkButton from './MarkButton'
import BlockButton from './BlockButton'

export default class App extends Component {
  state = {
    editorState: createEditorState({
      blocks: [{
        text: 'One Line'
      }, {
        text: 'Another line'
      }, {
        type: 'image',
        data: {
          src: 'https://placekitten.com/400/300',
          title: 'A lovely kitten'
        }
      }]
    })
  }

  onChange = editorState => {
    console.log('Editor.props.onChange', editorState)
    this.setState({ editorState })
  }

  render () {
    const buttonProps = {
      editorState: this.state.editorState,
      onChange: this.onChange
    }

    return (
      <div>
        <div className='button-bar'>
          <MarkButton {...buttonProps} mark='bold'>B</MarkButton>
          <MarkButton {...buttonProps} mark='italic'>I</MarkButton>
          <MarkButton {...buttonProps} mark='large'>Large</MarkButton>
          <MarkButton {...buttonProps} mark='small'>Small</MarkButton>
          <BlockButton {...buttonProps} type='header-one'>H1</BlockButton>
          <BlockButton {...buttonProps} type='code'>Code</BlockButton>
        </div>
        <Editor
          onChange={this.onChange}
          renderFragment={({ fragment, children }) => {
            return <span className={fragment.marks.join(' ')}>{children}</span>
          }}
          renderBlock={({ block, children }) => {
            if (block.type === 'image') {
              return <img src={block.data.src} alt={block.data.title} />
            }
            if (block.type === 'header-one') {
              return <h1>
                <EditorText />
              </h1>
            }
            return <div>
              <EditorText />
              <EditorBlockChildren />
            </div>
          }}
          editorState={this.state.editorState}
        />
      </div>
    )
  }
}
