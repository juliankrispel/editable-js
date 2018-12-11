// @flow

import { createEditorState } from '../../create'
import { commit } from '../../history'
import collapseBlock from '../collapseBlock'

describe('collapseBBlock', () => {
  test('moves children into parent node and deletes block ', () => {
    const initialState = createEditorState({
      blocks: [{
        key: '1',
        text: 'One',
        children: [{
          key: '2',
          text: 'Two',
          children: [{
            key: '3',
            text: 'Three'
          }]
        }]
      }]
    })

    const newEditorState = commit(
      initialState,
      collapseBlock,
      initialState.content[0].children[0].key
    )

    const { content } = createEditorState({
      blocks: [{
        key: '1',
        text: 'One',
        children: [{
          key: '3',
          text: 'Three'
        }]
      }]
    })

    expect(newEditorState.content).toEqual(content)
  })

  test('moves children into the right place ', () => {
    const initialState = createEditorState({ blocks: [{
      key: '1',
      text: 'One',
      children: [{
        key: '2',
        text: 'Two',
        children: [{
          key: '3',
          text: 'Three'
        }]
      }, {
        key: '4',
        text: 'Four'
      }, {
        key: '5',
        text: 'Five'
      }]
    }]})

    const newEditorState = commit(
      initialState,
      collapseBlock,
      initialState.content[0].children[0].key
    )

    const { content } = createEditorState({
      blocks: [{
        key: '1',
        text: 'One',
        children: [{
          key: '3',
          text: 'Three'
        }, {
          key: '4',
          text: 'Four'
        }, {
          key: '5',
          text: 'Five'
        }]
      }]
    })

    expect(newEditorState.content).toEqual(content)
  })
})
