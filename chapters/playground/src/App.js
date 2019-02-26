import React, { Component } from 'react'
import {
  Editor,
  EditorBlockChildren,
  EditorText,
  createEditorState
} from 'editable-js'

export default class App extends Component {
  state = {
    editorState: createEditorState({
      blocks: [{
        type: 'table',
        children: [{
          type: 'row',
          children: [{
            type: 'cell',
            text: 'One'
          }, {
            type: 'cell',
            text: 'Two'
          }, {
            type: 'cell',
            text: 'Three'
          }]
        }, {
          type: 'row',
          children: [{
            type: 'cell',
            text: 'Four'
          }, {
            type: 'cell',
            text: 'Five'
          }, {
            type: 'cell',
            text: 'Six'
          }]
        }]
      }]
    })
  }

  render () {
    return (
      <Editor
        onChange={editorState => {
          console.log('Editor.props.onChange', editorState)
          this.setState({ editorState })
        }}
        renderBlock={({ block, children }) => {
          if (block.type === 'table') {
            return <table><tbody><EditorBlockChildren /></tbody></table>
          } else if (block.type === 'row') {
            return <tr><EditorBlockChildren /></tr>
          } else if (block.type === 'cell') {
            return <td><EditorText /></td>
          }
          return <div>
            <EditorText />
            <EditorBlockChildren />
          </div>
        }}
        editorState={this.state.editorState}
      />
    )
  }
}
