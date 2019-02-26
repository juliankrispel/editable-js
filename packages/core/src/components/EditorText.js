// @flow

import React, { useContext } from 'react'
import { createTextFragments } from '../create'
import EditorContext from './EditorContext'

export default function EditorText() {
  const {
    block,
    editorState,
    renderFragment: RenderFragment
  } = useContext(EditorContext)

  const { key, text } = block
  let textFragments = text

  if (text != null && text.length > 0) {
    const fragments = createTextFragments(block, editorState.entityMap)

    let offset = 0

    textFragments = fragments.map(fragment => {
      let textFragment = <span
        key={key}
        data-block-key={key}
        data-fragment-start={offset}
        data-fragment-end={offset + fragment.text.length}
      >{fragment.text || <br />}</span>

      if (RenderFragment) {
        textFragment = <RenderFragment data-block-key={key} key={key} fragment={fragment}>{textFragment}</RenderFragment>
      }

      offset += fragment.text.length
      return textFragment
    })
  } else {
    textFragments = <span
      key={key}
      data-block-key={key}
      data-fragment-start={0}
      data-fragment-end={0}
    ><br /></span>
  }

  return textFragments
}
