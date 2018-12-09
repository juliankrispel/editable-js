// @flow

import type { Patch } from 'immer'

export type SelectionState = {
  startOffset: number,
  endOffset: number,
  startKey: string,
  endKey: string
}

export type CharacterData = {
  styles: Array<string>,
  entities: Array<string>
}

export type Fragment = {
  text: string,
  type: string,
}

export type Block = {
  key: string,
  text: string,
  characterData: Array<CharacterData>,
  entityData: { [string]: any },
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

export type ContentState = Array<Block>

export type CharacterRange = {
  start: number,
  offset: number,
  styles?: Array<string>,
  entities?: Array<string>,
}

export type RawBlock = {
  text: string,
  type?: string,
  key?: string,
  data?: Object,
  characterRanges?: Array<CharacterRange>,
  entityData: { [string]: any },
  children?: Array<RawBlock>
}

export type RawContentState = Array<RawBlock>

export type EditorState = {
  content: ContentState,
  selection: SelectionState,
  changes: Array<{
    forward: Array<Patch>,
    reverse: Array<Patch>,
  }>,
  changeIndex: number,
  lastCommitted: ?string
}
