import React, { Component } from 'react'
import { Editor, createEditorState } from 'editable-js'

export default class App extends Component {
  state = {
    editorState: createEditorState({
      entityMap: {
        '1': {
          type: 'image',
          mutable: false,
          data: {
            src: 'http://placekitten.com/40/40'
          }
        },
        '2': {
          type: 'mention',
          mutable: true,
          data: {
            name: 'Jabba da Hutt'
          }
        }
      },
      blocks: [{
        text: 'Hello   Jabba',
        characterRanges: [{
          offset: 6,
          length: 1,
          entity: '1'
        }, {
          offset: 8,
          length: 5,
          entity: '2'
        }],
        children: [{
          text: 'Level 1 - 1',
          children: [{
            text: 'Hello there',
            characterRanges: [{
              offset: 0,
              length: 5,
              marks: ['italic']
            }, {
              offset: 3,
              length: 5,
              marks: ['bold']
            }]
          }]
        }, {
          text: '1 - 2'
        }]
      }, {
        text: '2'
      }]
    })
  }

  render () {
    return (
      <Editor
        onChange={editorState => {
          // console.log('Editor.props.onChange', editorState)
          this.setState({ editorState })
        }}
        renderFragment={({ fragment, children }) => {
          const { entity } = fragment
          if (entity != null && entity.type === 'image') {
            return <img className='inline-image' src={entity.data.src} />
          } else if (entity != null && entity.type === 'mention') {
            return <span className='mention' data-mention={entity.data.name}>@{children}</span>
          }
          return <span className={fragment.marks.join(' ')}>{children}</span>
        }}
        renderBlock={({ block, children }) => <div className='tree-node'>{children}</div>}
        editorState={this.state.editorState}
      />
    )
  }
}
