// @flow

import React, { Fragment } from 'react'
import EditorText from './EditorText'
import EditorBlockChildren from './EditorBlockChildren'

export default function EditorBlock() {
  return <Fragment>
    <EditorText />
    <EditorBlockChildren />
  </Fragment>
}
