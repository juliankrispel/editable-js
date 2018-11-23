// @flow

import type { BlockMap, ContentState } from '../types'

export default function getBlockMap(
  content: ContentState,
  _path: Array<number> = []
  // ^ Only used to accumulate the path
): BlockMap {
  return content.reduce(
    (acc, block, index) => {
      let result = {
        ...acc,
        [block.key]: {
          path: _path.concat([index]),
          block
        }
      }

      if (Array.isArray(block.children)) {
        result = {
          ...result,
          ...getBlockMap(block.children, _path.concat([index]))
        }
      }

      return result
    }, {})
}
