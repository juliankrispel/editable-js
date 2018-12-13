// @flow

export { Editor } from './components'

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
  hasDescendant
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
  toggleCurrentMark,
  removeRange,
  splitBlock,
  updateBlock,
  collapseSelectionToEnd,
  collapseSelectionToStart,
  updateSelection,
  setCurrentCharacterData
} from './mutations'
