// @flow

import { createEditorState } from '../../create'
import getBlockParent from '../getBlockParent'

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

describe('getBlockParent', () => {
  test('gets correct block', () => {
    const expectedState = content[0].children[0]

    expect(getBlockParent(content, content[0].children[0].children[0].key)).toEqual(expectedState)
  })

  test('returns null if block does not exist', () => {
    expect(getBlockParent(content, 'key-does-not-exist')).toBeNull()
  })

  test('returns null if there is no parent', () => {
    expect(getBlockParent(content, content[0].key)).toBeNull()
  })
})
