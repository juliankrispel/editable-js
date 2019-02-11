// @flow

import type { Patch } from 'immer'

export type SelectionState = {
  startOffset: number,
  endOffset: number,
  startKey: string,
  endKey: string
}

export type CharacterData = {
  marks: Array<string>,
  entity?: string
}

export type TextFragment = CharacterData & {
  text: string,
}

export type Block = {
  key: string,
  text: string,
  characterData: Array<CharacterData>,
  type?: string,
  data?: Object,
  children?: Array<Block>
}

export type BlockList = Array<{
  path: Array<number>,
  key: string,
  block: Block
}>

export type BlockMap = {
  [key: string]: {
    path: Array<number>,
    block: Block
  }
}

export type Entity = {
  type: string,
  mutable: boolean,
  data: any
}

export type EntityMap = {
  [string]: Entity
}

export type ContentState = Array<Block>

export type CharacterRange = {
  offset: number,
  length: number,
  marks?: Array<string>,
  entity?: string
}

export type RawBlock = {
  text: string,
  type?: string,
  key?: string,
  data?: Object,
  characterRanges?: Array<CharacterRange>,
  children?: Array<RawBlock>
}

export type RawContentState = {
  blocks: Array<RawBlock>,
  entityMap?: EntityMap
}

export type EditorState = {
  content: ContentState,
  entityMap: EntityMap,
  selection: SelectionState,
  currentCharacterData: CharacterData,
  changes: Array<{
    forward: Array<Patch>,
    reverse: Array<Patch>,
  }>,
  changeIndex: number,
  lastCommitted: ?string
}

export type RenderFragment = ({ fragment: TextFragment, children: Node }) => Node

export type RenderBlock = ({ block: Block }) => Node
