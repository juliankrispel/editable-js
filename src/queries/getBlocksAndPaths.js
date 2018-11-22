// @flow

import type { BlocksAndPaths, ContentState } from '../types'

// TODO - memoize - this will be used a lot
export default function getBlocksAndPaths(
  content: ContentState,
  path: Array<number> = []
): BlocksAndPaths {
  return content.reduce(
    (acc, block, index) => {
      let result = [
        ...acc,
        {
          key: block.key,
          path: path.concat([index]),
          block
        }
      ]

      if (Array.isArray(block.children)) {
        result = result.concat(getBlocksAndPaths(block.children, path.concat([index])))
      }

      return result
    }, [])
}
