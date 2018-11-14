// @flow
import type { EditorState, SelectionState } from './types'

const findRangeTarget = (el: ?Node): ?Node => {
  if (el == null) {
    return null
  } else if (['#text', 'BR'].includes(el.nodeName)) {
    return el
  } else if (el.childNodes) {
    const childNodes = Array.from(el.childNodes)

    for (let i = 0; i <= childNodes.length; i++) {
      let child = findRangeTarget(childNodes[i])
      if (child != null) {
        return child
      }
    }
  }

  return null
}

const getBlockNode = (el: HTMLElement): ?HTMLElement => {
  if (el.dataset && el.dataset.blockKey) {
    return el
  } else if (el.parentElement) {
    // $FlowFixMe
    return getBlockNode(el.parentElement)
  }
  return null
}

export const getDomSelection = ({ content, selection }: EditorState): SelectionState => {
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

export const setDomSelection = (
  containerNode: HTMLElement,
  { startOffset, endOffset, startKey, endKey }: SelectionState
): void => {
  const newSelection = window.getSelection()
  const startNode = findRangeTarget(containerNode.querySelector(`[data-block-key="${startKey}"]`))
  const endNode = findRangeTarget(containerNode.querySelector(`[data-block-key="${endKey}"]`))
  newSelection.removeAllRanges()
  const range = document.createRange()

  if (startNode != null && endNode != null) {
    range.setStart(startNode, startOffset)
    range.setEnd(endNode, endOffset)
    newSelection.addRange(range)
  }
}
