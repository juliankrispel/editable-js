// @flow

import type { RawBlock, Block } from '../types'
import createId from './createId'

export default function createBlock (block: RawBlock): Block {
  const { children, key, ...rest } = block

  const newBlock = {
    ...rest,
    //    characterData: Array(block.text.length).fill([]),
    children: [],
    key: key || createId()
  }

  if (Array.isArray(children)) {
    newBlock.children = children.map(createBlock)
  }

  return newBlock
}
