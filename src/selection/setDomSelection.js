// @flow
import type { SelectionState } from '../types'

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

export default function setDomSelection(
  containerNode: HTMLElement,
  { startOffset, endOffset, startKey, endKey }: SelectionState
): void {
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
