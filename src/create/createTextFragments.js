// @flow
import type { TextFragment, Block, EntityMap } from '../types'
import hasEqualCharacterData from '../hasEqualCharacterData'

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
        if (hasEqualCharacterData(lastFragment, data)) {
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
    entity: fragment.entity != null ? entityMap[fragment.entity] : null
  }))
}
