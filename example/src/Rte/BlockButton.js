import React from 'react'
import { commit, toggleBlockType, hasBlockType } from 'editable-js'

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
