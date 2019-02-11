// @flow

import { createEditorState } from '../../create'
import getBlockMap from '../getBlockMap'

describe('getBlockMap', () => {
  test('get blocks and paths as map', () => {
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

    const expectedState = {
      [content[0].key]: {
        path: [0],
        block: content[0]
      },
      [content[0].children[0].key]: {
        path: [0, 0],
        block: content[0].children[0]
      },
      [content[0].children[0].children[0].key]: {
        path: [0, 0, 0],
        block: content[0].children[0].children[0]
      },
      [content[1].key]: {
        path: [1],
        block: content[1]
      }
    }

    expect(getBlockMap(content)).toEqual(expectedState)
  })
})
