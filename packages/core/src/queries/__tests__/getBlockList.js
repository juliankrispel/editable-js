// @flow

import { createEditorState } from '../../create'
import getBlockList from '../getBlockList'

describe('getBlockList', () => {
  test('get blocks and paths from tree structure', () => {
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

  test('get blocks in order from list with non-alphabetic keys', () => {
    const blocks = [{
      text: 'Zero',
      key: '00'
    }, {
      text: 'start -----',
      key: '01'
    }, {
      text: 'Two',
      key: '9wqdwqd21ca'
    }, {
      text: 'Three',
      key: '1jd21h8f3hj'
    }, {
      text: '----- end',
      key: '04'
    }, {
      text: 'Five',
      key: '05'
    }]

    const blockKeys = blocks.map(block => block.key)
    const { content } = createEditorState({ blocks })

    expect(getBlockList(content).map(block => block.key)).toEqual(blockKeys)
  })
})
