// @flow

import type { Patch } from 'immer'

export type SelectionState = {
  startOffset: number,
  endOffset: number,
  startKey: string,
  endKey: string
}

export type CharacterData = Array<{
  type: string,
  [string]: any
}>

export type Block = {
  key: string,
  text: string,
  characterData: Array<CharacterData>,
  data?: Object,
  parent?: string
}

export type ContentState = Array<Block>

export type CharacterRange = {
  start: number,
  offset: number,
  [string]: any
}

export type RawBlock = {
  text: string,
  data?: Object,
  parent?: string,
  characterRanges?: Array<CharacterRange>
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

