/* eslint-disable react/prop-types */

import React from 'react'
import { commit, toggleBlockType, hasBlockType } from 'zettel'

export default function BlockButton({
  editorState,
  type,
  onChange,
  children
}) {
  const isActive = hasBlockType(editorState.content, editorState.selection, type)
  return <button
    className={`button ${isActive ? 'active' : ''}`}
    onClick={() => onChange(commit(editorState, toggleBlockType, editorState.selection, type))}
  >
    {children}
  </button>
}
