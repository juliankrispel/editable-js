import React, { Component } from 'react'
import { Editor, createEditorState } from 'editable-js'

export default class App extends Component {
  state = {
    editorState: createEditorState([{
      text: 'One',
      children: [{
        text: 'One A'
      }, {
        text: 'One B'
      }]
    }, {
      text: 'Two'
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
