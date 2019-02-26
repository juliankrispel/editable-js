// @flow

import type { RawBlock, Block } from '../types'
import createId from './createId'
import createCharacterData from './createCharacterData'

export default function createBlock (block: RawBlock): Block {
  const { children, text = '', key, characterRanges, ...rest } = block

  if (process.env.NODE_ENV !== 'production' && key != null && !isNaN(Number(key))) {
    throw new Error('block key can not be a number')
  }

  const newBlock = {
    ...rest,
    text,
    characterData: createCharacterData(block),
    children: [],
    key: key || createId()
  }

  if (Array.isArray(children)) {
    newBlock.children = children.map(createBlock)
  }

  return newBlock
}
