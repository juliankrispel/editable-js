// @flow

import { createEditorState } from '../../create'
import getBlockBefore from '../getBlockBefore'

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

describe('getBlockBefore', () => {
  test('returns correct block', () => {
    expect(getBlockBefore(content, content[0].children[0].children[0].key)).toEqual(content[0].children[0])
  })

  test('returns null if block does not exist', () => {
    expect(getBlockBefore(content, 'key-does-not-exist')).toBeNull()
  })
})
