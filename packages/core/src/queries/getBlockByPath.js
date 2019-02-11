// @flow

import type { Block, ContentState } from '../types'

export default function getBlockByPath(
  content: ContentState | Block,
  path: Array<number>
): ?Block {
  // $FlowFixMe - damn flow
  return path.reduce((obj, index) => {
    if (obj == null) {
      return null
    } else if (Array.isArray(obj)) {
      return obj[index]
    } else if (Array.isArray(obj.children)) {
      return obj.children[index] || null
    }

    return null
  }, content)
}
