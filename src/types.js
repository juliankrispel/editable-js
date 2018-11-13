// @flow

export type SelectionState = {
  startOffset: number,
  endOffset: number,
  startKey: string,
  endKey: string,
}

export type Leaf = {
  key: string,
  value: Array<Leaf> | string,
  data?: Object
}

export type EditorState = {
  content: Array<Leaf>,
  selection: SelectionState
}
