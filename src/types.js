// @flow

import type { Patch } from 'immer'

export type SelectionState = {
  startOffset: number,
  endOffset: number,
  startKey: string,
  endKey: string,
}


export type Block = {
  key: string,
  value: string,
  data?: Object
}

export type ContentState = Array<Block>

export type RawBlock = {
  value: string,
  data?: Object,
}

export type RawContentState = Array<RawBlock>

export type EditorState = {
  content: ContentState,
  selection: SelectionState,
  changes: Array<{
    redo: Array<Patch>,
    undo: Array<Patch>,
  }>,
  changeIndex: number,
  lastCommitted: ?string
}

type CharacterRange = {
  start: number,
  offset: number,
  [string]: any
}

type CharacterData = Array<{
  [string]: any
}>

type NewBlock = {
  key: string,
  text: string,
  characterData: Array<CharacterData>,
  data?: Object
}
