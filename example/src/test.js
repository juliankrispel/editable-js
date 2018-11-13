import React, { Component } from 'react'

export default class App extends Component {
  state = {
    model: ['one', 'two', 'three']
  }

  onKeyDown = (e) => {
    e.preventDefault()

    const selection = window.getSelection()

    const { isCollapsed, baseNode: { parentNode: anchorNode }, baseOffset: anchorOffset, focusOffset, focusNode: { parentNode: focusNode } } = selection

    const anchorKey = Number(anchorNode.dataset.blockKey)
    const focusKey = Number(focusNode.dataset.blockKey)

    let startNode = anchorNode
    // let endNode = focusNode
    let startOffset = anchorOffset
    let endOffset = focusOffset
    let startKey = anchorKey
    let endKey = focusKey

    const reverse = anchorKey > focusKey

    console.log('selection', selection)
    console.log('anchor key', anchorKey)
    console.log('focus key', focusKey)

    if (reverse === true) {
      startNode = focusNode
      // endNode = anchorNode
      startKey = focusKey
      endKey = anchorKey
      startOffset = focusOffset
      endOffset = anchorOffset
    }

    console.log('startKey', startKey)
    console.log('endKey', endKey)

    if (e.key === 'Backspace') {
      if (isCollapsed) {
        startOffset = startOffset - 1
      }

      this.setState({
        model: [...this.state.model.filter((val, index) => {
          // remove inbetween
          return index <= startKey || index >= endKey
        }).map((val, index) => {
          if (startKey === endKey && startKey === index) {
            return `${val.substr(0, startOffset)}${val.substr(endOffset)}`
          } else if (startKey === index) {
            return val.substr(0, startOffset)
          } else if (endKey === index) {
            return val.substr(endOffset)
          }
          return val
        })]
      })

      console.log('state update')
      setTimeout(() => {
        const newSelection = window.getSelection()
        newSelection.removeAllRanges()
        const range = document.createRange()
        const node = startNode.childNodes[0]
        range.setStart(node, startOffset)
        newSelection.addRange(range)
        console.log(newSelection)
      })
    }

    console.log('anchor offset', anchorOffset)
    console.log('focus offset', focusOffset)
  }

  render () {
    console.log('render')
    return (
      <div contentEditable onKeyDown={this.onKeyDown}>
        {this.state.model.map((val, index) => {
          return <div data-block-key={index} key={`block-${index}`}>{val}</div>
        })}
      </div>
    )
  }
}
