// @flow

import type { BlockMap, ContentState } from '../types'

export default function getBlockMap(
  content: ContentState,
  path: Array<number> = []
): BlockMap {
  return content.reduce(
    (acc, block, index) => {
      let result = {
        ...acc,
        [block.key]: {
          path: path.concat([index]),
          block
        }
      }

      if (Array.isArray(block.children)) {
        result = {
          ...result,
          ...getBlockMap(block.children, path.concat([index]))
        }
      }

      return result
    }, {})
}
