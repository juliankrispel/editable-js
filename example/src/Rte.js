import React, { Component } from 'react'
import { Editor, createEditorState, toggleCurrentMark, commit } from 'editable-js'

export default class App extends Component {
  state = {
    editorState: createEditorState({
      blocks: [{
        text: 'One Line'
      }, {
        text: 'Another line'
      }]
    })
  }

  render () {
    return (
      <div>
        <div>
          <button onClick={() => this.setState({
            editorState: commit(this.state.editorState, toggleCurrentMark, 'bold')
          })}>Bold</button>
          <button onClick={() => this.setState({
            editorState: commit(this.state.editorState, toggleCurrentMark, 'italic')
          })}>Italic</button>
          <button onClick={() => this.setState({
            editorState: commit(this.state.editorState, toggleCurrentMark, 'code')
          })}>Code</button>
        </div>
        <Editor
          onChange={editorState => {
            console.log('Editor.props.onChange', editorState)
            this.setState({ editorState })
          }}

          renderFragment={({ fragment, children }) => {
            return <span className={fragment.marks.join(' ')}>{children}</span>
          }}

          renderBlock={({ block, children }) => {
            return <div>
              {children}
            </div>
          }}
          editorState={this.state.editorState}
        />
      </div>
    )
  }
}
