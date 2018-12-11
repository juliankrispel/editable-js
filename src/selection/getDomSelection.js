// @flow
import type { EditorState, SelectionState } from '../types'
import { getBlockMap } from '../queries'

const getFragmentNode = (el: HTMLElement): ?HTMLElement => {
  if (el.dataset && el.dataset.blockKey) {
    return el
  } else if (el.parentElement) {
    // $FlowFixMe
    return getFragmentNode(el.parentElement)
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

  const anchorNode = getFragmentNode(domSelection.baseNode)
  const focusNode = getFragmentNode(domSelection.focusNode)

  if (anchorNode == null || focusNode == null) {
    return selection
  }

  const anchorKey = anchorNode.dataset.blockKey
  const focusKey = focusNode.dataset.blockKey

  const anchorFragmentOffset = parseInt(anchorNode.dataset.fragmentStart)
  const focusFragmentOffset = parseInt(focusNode.dataset.fragmentStart)

  const keys = Object.keys(getBlockMap(content))
  const anchorIndex = keys.indexOf(anchorKey) + anchorFragmentOffset
  const focusIndex = keys.indexOf(focusKey) + focusFragmentOffset

  let startOffset = anchorOffset + anchorFragmentOffset
  let endOffset = focusOffset + focusFragmentOffset
  let startKey = anchorKey
  let endKey = focusKey

  const reverse = anchorIndex > focusIndex

  if (reverse === true) {
    startKey = focusKey
    endKey = anchorKey
    startOffset = focusOffset + focusFragmentOffset
    endOffset = anchorOffset + anchorFragmentOffset
  }

  return {
    startOffset,
    endOffset,
    startKey,
    endKey
  }
}
