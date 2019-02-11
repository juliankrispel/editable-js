// @flow

import { createEditorState } from '../../create'
import getBlockAfter from '../getBlockAfter'

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

describe('getBlockAfter', () => {
  test('gets correct block', () => {
    expect(getBlockAfter(content, content[0].children[0].children[0].key)).toEqual(content[1])
  })

  test('returns null if block does not exist', () => {
    expect(getBlockAfter(content, 'key-does-not-exist')).toBeNull()
  })
})
