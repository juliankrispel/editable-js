// @flow

import { createEditorState } from '../../create'
import { commit } from '../../history'
import updateCharacterData from '../updateCharacterData'

describe('updateCharacterData', () => {
  test('updates character data at given range', () => {
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

    const selection = {
      startKey: '1',
      endKey: '3',
      startOffset: 2,
      endOffset: 3
    }

    const result = commit(
      initialState,
      updateCharacterData,
      selection,
      (data) => {
        data.marks.push('bold')
      }
    )

    expect(result).toMatchSnapshot()
  })
})
