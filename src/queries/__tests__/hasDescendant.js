// @flow

import { createEditorState } from '../../create'
import hasDescendant from '../hasDescendant'

const { content } = createEditorState([{
  text: 'One',
  children: [{
    text: 'Two',
    children: [{
      key: '6',
      text: 'Three'
    }]
  }]
}, {
  text: 'Four'
}])

describe('hasDescendant', () => {
  test('returns true if has descendant', () => {
    expect(hasDescendant(content, '6')).toBe(true)
  })

  test('returns false if descendant does not exist', () => {
    expect(hasDescendant(content, 'key-does-not-exist')).toBe(false)
  })
})
