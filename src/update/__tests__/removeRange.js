// @flow

import { createEditorState } from '../../createEditorState'
import type { SelectionState } from '../../types'
import commit from '../../commit'
import removeRange from '../removeRange'

describe('removeRange', () => {
  test.skip('removes nested range without destroying unselected children', () => {
  /*
   * Blocks:
   * A
   *  B
   *    C
   *      D
   *    E
   *  F
   *
   * Selection: A, C
   *
   * Result:
   *
   * A + C
   *  D
   *  E
   *  F
   *
   */

    const initialState = createEditorState([{
      text: 'start ',
      children: [{
        // delete and fold children into parent
        text: 'One',
        children: [{
          // delete and fold children into parent
          text: 'Two',
          children: [{
            // delete
            text: 'Three'
          }, {
            // get last block first and merge it
            text: 'end',
            children: [
              { text: 'Last Kid' }
            ]
          }]
        }, {
          text: 'Four'
        }]
      }, {
        text: 'Five'
      }]
    }, {
      text: 'Six'
    }])

    const selection: SelectionState = {
      startOffset: 6,
      startKey: initialState.content[0].key,
      endOffset: 0,
      endKey: initialState.content[0].children[0].children[0].children[1].key
    }

    const expectedState = createEditorState([{
      text: 'start end',
      children: [
        {
          text: 'Last Kid'
        },
        {
          text: 'Four'
        }, {
          text: 'Five'
        }]
    }, {
      text: 'Six'
    }])

    const newEditorState = commit(initialState, removeRange, selection)

    expect(newEditorState.content).toEqual(expectedState)
  })
})
