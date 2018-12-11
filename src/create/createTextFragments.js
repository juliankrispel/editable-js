// @flow
import type { TextFragment, Block, EntityMap } from '../types'

const hasEqualMarks = (left, right) =>
  right.entity === left.entity &&
  Array.from(left.marks).sort().join('') === Array.from(right.marks).sort().join('')

export default function createTextFragments(block: Block, entityMap: EntityMap): Array<TextFragment> {
  return block.characterData.reduce(
    (acc, data, index) => {
      if (acc.length < 1) {
        return [{
          marks: data.marks,
          entity: data.entity,
          offset: index,
          text: block.text[index]
        }]
      } else {
        const lastFragment = acc[acc.length - 1]
        if (hasEqualMarks(lastFragment, data)) {
          return acc.slice(0, -1).concat([{
            ...lastFragment,
            text: lastFragment.text + block.text[index]
          }])
        } else {
          return [
            ...acc,
            {
              marks: data.marks,
              entity: data.entity,
              offset: index,
              text: block.text[index]
            }
          ]
        }
      }
    },
    []
  ).map(fragment => ({
    ...fragment,
    entity: fragment.entity != null ? entityMap[fragment.entity] : null,
  }))
}
