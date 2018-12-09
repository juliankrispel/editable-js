// @flow

import type { RawBlock, Block } from '../types'
import createId from './createId'
import createCharacterData from './createCharacterData'

export default function createBlock (block: RawBlock): Block {
  const { children, entityData = {}, text = '', key, characterRanges, ...rest } = block

  const newBlock = {
    ...rest,
    text,
    entityData,
    characterData: createCharacterData(block),
    children: [],
    key: key || createId()
  }

  if (Array.isArray(children)) {
    newBlock.children = children.map(createBlock)
  }

  return newBlock
}
