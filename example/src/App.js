import React, { Component } from 'react'
import { Editor } from 'editable-js'

export default class App extends Component {
  state = {
    editorState: {
      content: [{
        key: '1',
        value: 'One'
      }, {
        key: '2',
        value: 'Two'
      }]
    }
  }

 render () {
    return (
      <Editor
        onChange={editorState => {
          console.log('yo', editorState)
          this.setState({ editorState })
        }}
        editorState={this.state.editorState}
      />
    )
  }
}
