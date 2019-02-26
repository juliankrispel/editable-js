// @flow

import { createEditorState } from '../../create'
import type { SelectionState } from '../../types'
import { commit } from '../../history'
import removeRange from '../removeRange'

describe('removeRange', () => {
  describe('when selection starts at parent block and ends at child block ', () => {
    const selection: SelectionState = {
      startOffset: 6,
      startKey: '1',
      endOffset: 0,
      endKey: '5'
    }

    const initialState = { blocks: [{
      text: 'start ',
      key: '1',
      children: [{
        text: 'One',
        key: '2',
        children: [{
          text: 'Two',
          key: '3',
          children: [{
            text: 'Three',
            key: '4'
          }, {
            text: 'end',
            key: '5',
            children: [
              {
                text: 'Last Kid',
                key: '6'
              }
            ]
          }]
        }, {
          text: 'Four',
          key: '7'
        }]
      }, {
        text: 'Five',
        key: '8'
      }]
    }, {
      text: 'Six',
      key: '9'
    }]}

    const newEditorState = commit(createEditorState(initialState), removeRange, selection)

    test('removes correct content', () => {
      const expectedState = createEditorState({ blocks: [{
        text: 'start end',
        key: '1',
        children: [{
          text: 'Last Kid',
          key: '6'
        }, {
          text: 'Four',
          key: '7'
        }, {
          text: 'Five',
          key: '8'
        }]
      }, {
        text: 'Six',
        key: '9'
      }]})

      expect(newEditorState.content).toEqual(expectedState.content)
    })

    test('collapses selection', () => {
      const expectedSelection = {
        startOffset: 6,
        startKey: '1',
        endOffset: 6,
        endKey: '1'

      }
      expect(newEditorState.selection).toEqual(expectedSelection)
    })
  })

  describe('when selection starts and ends at sibling', () => {
    const initialState = createEditorState({ blocks: [{
      text: 'start -----',
      key: '1'
    }, {
      text: '----- end',
      key: '2'
    }]})

    const selection: SelectionState = {
      startOffset: 5,
      startKey: '1',
      endOffset: 6,
      endKey: '2'
    }

    test('removes text fragments over multiple blocks correctly', () => {
      const expectedState = createEditorState({ blocks: [{
        text: 'startend',
        key: '1'
      }]})

      const newEditorState = commit(initialState, removeRange, selection)

      expect(newEditorState.content).toEqual(expectedState.content)
    })

    test('collapses selection to start', () => {
      const expectedSelection = {
        startOffset: 5,
        startKey: '1',
        endOffset: 5,
        endKey: '1'
      }

      const newEditorState = commit(initialState, removeRange, selection)
      expect(newEditorState.selection).toEqual(expectedSelection)
    })
  })

  describe('when selection starts at 1 and ends at 4', () => {
    const initialState = createEditorState({ blocks: [{
      text: 'Zero',
      key: '00'
    }, {
      text: 'start -----',
      key: '01'
    }, {
      text: 'Two',
      key: '9wqdwqd21ca'
    }, {
      text: 'Three',
      key: '1jd21h8f3hj'
    }, {
      text: '----- end',
      key: '04'
    }, {
      text: 'Five',
      key: '05'
    }]})

    const selection: SelectionState = {
      startOffset: 5,
      startKey: '01',
      endOffset: 6,
      endKey: '04'
    }

    test('removes text fragments over multiple blocks correctly', () => {
      const expectedState = createEditorState({ blocks: [{
        text: 'Zero',
        key: '00'
      }, {
        text: 'startend',
        key: '01'
      }, {
        text: 'Five',
        key: '05'
      }]})

      const newEditorState = commit(initialState, removeRange, selection)

      expect(newEditorState.content).toEqual(expectedState.content)
    })

    test('collapses selection to start', () => {
      const expectedSelection = {
        startOffset: 5,
        startKey: '01',
        endOffset: 5,
        endKey: '01'
      }

      const newEditorState = commit(initialState, removeRange, selection)
      expect(newEditorState.selection).toEqual(expectedSelection)
    })
  })

  describe('when selection starts and ends in same block', () => {
    const initialState = createEditorState({ blocks: [{
      text: '0,1,A,2',
      key: '1'
    }]})

    const selection: SelectionState = {
      startOffset: 4,
      startKey: '1',
      endOffset: 6,
      endKey: '1'
    }

    const newEditorState = commit(initialState, removeRange, selection)

    test('updates content correctly', () => {
      const expectedState = createEditorState({ blocks: [{
        text: '0,1,2',
        key: '1'
      }]})

      expect(newEditorState.content).toEqual(expectedState.content)
    })

    test('collapses selection', () => {
      const expectedSelection = {
        startOffset: 4,
        startKey: '1',
        endOffset: 4,
        endKey: '1'
      }

      expect(newEditorState.selection).toEqual(expectedSelection)
    })
  })
})
