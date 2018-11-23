// @flow

import { createEditorState } from '../../create'
import getBlockList from '../getBlockList'

describe('getBlockList', () => {
  test('get blocks and paths', () => {
    /*
     * Blocks:
     * A
     *  B
     *    C
     *      D
     *    E
     *  F
     *
     * Result:
     *
     * [{
     *   A.key
     *   A.path
     *   A.block
     * },{
     *   B.key
     *   B.path
     *   B.block
     * },
     * ...
     * ]
     *
     */

    const { content } = createEditorState([{
      text: 'One',
      children: [{
        text: 'Two',
        children: [{
          text: 'Three'
        }]
      }]
    }, {
      text: 'Four'
    }])

    const expectedState = [{
      path: [0],
      key: content[0].key,
      block: content[0]
    }, {
      path: [0, 0],
      key: content[0].children[0].key,
      block: content[0].children[0]
    }, {
      path: [0, 0, 0],
      key: content[0].children[0].children[0].key,
      block: content[0].children[0].children[0]
    }, {
      path: [1],
      key: content[1].key,
      block: content[1]
    }]

    expect(getBlockList(content)).toEqual(expectedState)
  })
})
