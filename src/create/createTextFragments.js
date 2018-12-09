// @flow
import type { TextFragment, Block } from '../types'

const isEqualFragment = (left, right) => (
  left.styles.sort().join('') === right.styles.sort().join('') &&
  left.entities.sort().join('') === right.entities.sort().join('')
)

export default function createTextFragments(block: Block): Array<TextFragment> {
  return block.characterData.reduce(
    (acc, data, index) => {
      if (acc.length < 1) {
        return [{
          ...data,
          text: block.text[index]
        }]
      } else {
        const lastFragment = acc[acc.length - 1]
        if (isEqualFragment(lastFragment, data)) {
          return acc.slice(0, -1).concat([{
            ...lastFragment,
            text: lastFragment.text + block.text[index]
          }])
        } else {
          return [
            ...acc,
            {
              ...data,
              text: block.text[index]
            }
          ]
        }
      }
    },
    []
  )
}
