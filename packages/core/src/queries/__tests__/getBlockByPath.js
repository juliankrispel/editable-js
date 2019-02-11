// @flow

import { createEditorState } from '../../create'
import getBlockByPath from '../getBlockByPath'

const { content } = createEditorState({ blocks: [{
  text: 'One',
  children: [{
    text: 'Two',
    children: [{
      text: 'Three'
    }]
  }]
}, {
  text: 'Four'
}]})

describe('getBlockByPath', () => {
  test('gets correct block', () => {
    const expectedState = content[0].children[0].children[0]

    expect(getBlockByPath(content, [0, 0, 0])).toEqual(expectedState)
  })

  test('returns null if block does not exist', () => {
    expect(getBlockByPath(content, [0, 0, 93])).toBeNull()
  })
})
