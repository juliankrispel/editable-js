// @flow

import type { Block, ContentState } from '../types'

export default function getBlockByPath(
  content: ContentState,
  path: Array<number>
): ?Block {
  return path.reduce((obj, index) => {
    if (Array.isArray(obj)) {
      return obj[index]
    } else if (Array.isArray(obj.children)) {
      return obj.children[index] || null
    }

    return null
  }, content)
}
