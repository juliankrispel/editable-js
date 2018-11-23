// @flow

import { createEditorState } from '../../create'
import type { SelectionState } from '../../types'
import commit from '../../commit'
import removeRange from '../removeRange'

describe('removeRange', () => {
  test.skip('removes nested range without destroying unselected children', () => {
    const initialState = createEditorState([{
      text: 'start ',
      key: '1',
      children: [{
        text: 'One',
        key: '2',
        children: [{
          text: 'Two',
          key: '3',
          children: [{
            text: 'Three',
            key: '4'
          }, {
            text: 'end',
            key: '5',
            children: [
              {
                text: 'Last Kid',
                key: '6'
              }
            ]
          }]
        }, {
          text: 'Four',
          key: '7'
        }]
      }, {
        text: 'Five',
        key: '8'
      }]
    }, {
      text: 'Six',
      key: '9'
    }])

    const selection: SelectionState = {
      startOffset: 6,
      startKey: '1',
      endOffset: 0,
      endKey: '5'
    }

    const expectedState = createEditorState([{
      text: 'start end',
      key: '1',
      children: [{
        text: 'Last Kid',
        key: '6'
      }, {
        text: 'Four',
        key: '7'
      }, {
        text: 'Five',
        key: '8'
      }]
    }, {
      text: 'Six',
      key: '9'
    }])

    const newEditorState = commit(initialState, removeRange, selection)

    expect(newEditorState.content).toEqual(expectedState.content)
  })
})
