// @flow

import createTextFragments from '../createTextFragments'
import createBlock from '../createBlock'

describe('createTextFragments', () => {
  describe('creates text fragments from block element', () => {
    test('without marks', () => {
      const block = createBlock({
        text: 'Hello World'
      })

      const result = createTextFragments(block)

      expect(result).toMatchSnapshot()
    })

    test('with marks', () => {
      const block = createBlock({
        text: 'Hello World',
        characterRanges: [{
          offset: 0,
          length: 4,
          marks: ['bold', 'italic']
        }]
      })

      const result = createTextFragments(block)

      expect(result).toMatchSnapshot()
    })

    test('with overlapping marks', () => {
      const block = createBlock({
        text: 'Hello World',
        characterRanges: [{
          offset: 0,
          length: 4,
          marks: ['bold']
        }, {
          offset: 1,
          length: 6,
          marks: ['italic']
        }, {
          offset: 3,
          length: 9,
          entities: ['1']
        }]
      })

      const result = createTextFragments(block)

      expect(result).toMatchSnapshot()
    })
  })
})
