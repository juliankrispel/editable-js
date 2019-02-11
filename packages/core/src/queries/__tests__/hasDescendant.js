// @flow

import { createEditorState } from '../../create'
import hasDescendant from '../hasDescendant'

const { content } = createEditorState({ blocks: [{
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
}]})

describe('hasDescendant with content', () => {
  test('returns true if has descendant', () => {
    expect(hasDescendant(content, '6')).toBe(true)
  })

  test('returns false if descendant does not exist', () => {
    expect(hasDescendant(content, 'key-does-not-exist')).toBe(false)
  })
})

describe('hasDescendant with block', () => {
  test('returns true if has descendant', () => {
    expect(hasDescendant(content[0], '6')).toBe(true)
  })

  test('returns false if descendant does not exist', () => {
    expect(hasDescendant(content[0], 'key-does-not-exist')).toBe(false)
  })
})
