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
  patches: Array<[Patch, Patch]>
}
