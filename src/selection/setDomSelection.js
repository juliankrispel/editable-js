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
  const startNodes = containerNode.querySelectorAll(`[data-block-key="${startKey}"]`)
  const endNodes = containerNode.querySelectorAll(`[data-block-key="${endKey}"]`)

  const startFragment = Array.from(startNodes).find(node => {
    return parseInt(node.dataset.fragmentStart) <= startOffset &&
    parseInt(node.dataset.fragmentEnd) >= startOffset
  })

  const startFragmentOffset = parseInt(startFragment.dataset.fragmentStart)

  const endFragment = Array.from(endNodes).find(node => {
    return parseInt(node.dataset.fragmentStart) <= endOffset &&
    parseInt(node.dataset.fragmentEnd) >= endOffset
  })

  const endFragmentOffset = parseInt(endFragment.dataset.fragmentStart)

  const startNode = findRangeTarget(startFragment)
  const endNode = findRangeTarget(endFragment)

  newSelection.removeAllRanges()
  const range = document.createRange()

  if (startNode != null && endNode != null) {
    range.setStart(startNode, startOffset - startFragmentOffset)
    range.setEnd(endNode, endOffset - endFragmentOffset)
    newSelection.addRange(range)
  }
}
