// @flow

import { createEditorState } from '../../create'
import getBlock from '../getBlock'

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

describe('getBlock', () => {
  test('gets correct block', () => {
    const expectedState = content[0].children[0].children[0]

    expect(getBlock(content, content[0].children[0].children[0].key)).toEqual(expectedState)
  })

  test('returns null if block does not exist', () => {
    expect(getBlock(content, 'key-does-not-exist')).toBeNull()
  })
})
