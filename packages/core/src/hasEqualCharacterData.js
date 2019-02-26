// @flow
import type { CharacterData, CharacterRange } from '../types'

type CharacterMeta = CharacterData | CharacterRange

export default function hasEqualCharacterData (
  left: CharacterMeta = { marks: [] },
  right: CharacterMeta = { marks: [] }
): boolean {
  // console.log('yo', left, right)
  return left != null && right != null && right.entity === left.entity &&
  Array.from(left.marks).sort().join('') === Array.from(right.marks).sort().join('')
}
