import React, { Component } from 'react'
import { Editor, createEditorState } from 'editable-js'

export default class App extends Component {
  state = {
    editorState: createEditorState([{
      value: 'One'
    }, {
      value: 'Two'
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
