import React from 'react'
import { commit, toggleCurrentMark, hasMark, isCollapsed } from 'zettel'

export default function Button({
  editorState,
  mark,
  onChange,
  children
}) {
  let isActive = hasMark(editorState.content, editorState.selection, mark)
  if (isCollapsed(editorState.selection)) {
    isActive = editorState.currentCharacterData && editorState.currentCharacterData.marks.includes(mark)
  }

  return <button
    className={`button ${isActive ? 'active' : ''}`}
    onClick={() => onChange(commit(editorState, toggleCurrentMark, mark))}
  >
    {children}
  </button>
}
