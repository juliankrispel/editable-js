// @flow
import type { EditorState, SelectionState } from '../types'

const getBlockNode = (el: HTMLElement): ?HTMLElement => {
  if (el.dataset && el.dataset.blockKey) {
    return el
  } else if (el.parentElement) {
    // $FlowFixMe
    return getBlockNode(el.parentElement)
  }
  return null
}

export default function getDomSelection({ content, selection }: EditorState): SelectionState {
  const domSelection = window.getSelection()

  if (domSelection.baseNode == null) {
    return selection
  }

  const {
    baseOffset: anchorOffset,
    focusOffset
  } = domSelection

  const anchorNode = getBlockNode(domSelection.baseNode)
  const focusNode = getBlockNode(domSelection.focusNode)

  if (anchorNode == null || focusNode == null) {
    return selection
  }

  const anchorKey = anchorNode.dataset.blockKey
  const focusKey = focusNode.dataset.blockKey

  const keys = content.map(node => node.key)
  const anchorIndex = keys.indexOf(anchorKey)
  const focusIndex = keys.indexOf(focusKey)

  let startOffset = anchorOffset
  let endOffset = focusOffset
  let startKey = anchorKey
  let endKey = focusKey

  const reverse = anchorIndex > focusIndex

  if (reverse === true) {
    startKey = focusKey
    endKey = anchorKey
    startOffset = focusOffset
    endOffset = anchorOffset
  }

  return {
    startOffset,
    endOffset,
    startKey,
    endKey
  }
}
