// @flow

export {
  Editor,
  EditorBlock,
  EditorText,
  EditorBlockChildren
} from './components'

export {
  createBlock,
  createEditorState,
  createTextFragments,
  createCharacterData,
  createId
} from './create'

export {
  getBlock,
  getBlockAfter,
  getBlockBefore,
  getBlockByPath,
  getBlockList,
  getBlockListInRange,
  getBlockMap,
  getBlockMapInRange,
  getBlockParent,
  getPreviousCharacterData,
  hasDescendant,
  hasMark,
  hasBlockType
} from './queries'

export {
  commit,
  redo,
  undo
} from './history'

export {
  isCollapsed,
  getDomSelection,
  setDomSelection
} from './selection'

export {
  collapseBlock,
  deleteBlock,
  insertBlockAfter,
  insertBlockBefore,
  insertText,
  replaceText,
  mergeBlock,
  removeRange,
  splitBlock,
  toggleCurrentMark,
  toggleBlockType,
  updateBlock,
  collapseSelectionToEnd,
  collapseSelectionToStart,
  updateSelection,
  setCurrentCharacterData
} from './mutations'
