// @flow

import type { RawBlock, CharacterData } from '../types'

export default function createCharacterData(block: RawBlock): Array<CharacterData> {
  if (block.text != null) {
    return block.text.split('').map((_, index) => {
      const data = {
        styles: [],
        entities: []
      }

      if (block.characterRanges != null) {
        block.characterRanges.filter(range => {
          return range.start <= index &&
          range.offset + range.start > index
        }).forEach(range => {
          if (Array.isArray(range.styles)) {
            data.styles = data.styles.concat(range.styles)
          }

          if (Array.isArray(range.entities)) {
            data.entities = data.entities.concat(range.entities)
          }
        })
      }

      return data
    })
  }
  return []
}
