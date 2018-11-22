import React, { Component } from 'react'
import { Editor, createEditorState } from 'editable-js'

export default class App extends Component {
  state = {
    editorState: createEditorState([{
      text: '1',
      children: [{
        text: '1 - 1',
        children: [{
          text: '1 - 1 - 1'
        }]
      }, {
        text: '1 - 2'
      }]
    }, {
      text: '2'
    }])
  }

  render () {
    return (
      <Editor
        onChange={editorState => {
          console.log('Editor.props.onChange', editorState)
          this.setState({ editorState })
        }}
        editorState={this.state.editorState}
      />
    )
  }
}
