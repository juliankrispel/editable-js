// @flow

import type { RawBlock, CharacterData } from '../types'

export default function createCharacterData(block: RawBlock): Array<CharacterData> {
  if (block.text != null) {
    return block.text.split('').map((_, index) => {
      const data = {
        marks: []
      }

      if (block.characterRanges != null) {
        block.characterRanges.filter(range => {
          return range.offset <= index &&
          range.offset + range.length > index
        }).forEach(range => {
          if (Array.isArray(range.marks)) {
            data.marks = data.marks.concat(range.marks)
          }

          if (range.entity != null) {
            data.entity = range.entity
          }
        })
      }

      return data
    })
  }
  return []
}
