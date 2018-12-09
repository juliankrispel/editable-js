// @flow
import createEditorState from '../createEditorState'

// const emptyState = {
//   content: [],
//   selection: {
//     startKey: 'a',
//     endKey: 'a',
//     startOffset: 0,
//     endOffset: 0
//   },
//   changes: [],
//   changeIndex: -1,
//   lastCommitted: null
// }

describe('createEditorState', () => {
  test('creates editor state with nested structure', () => {
    expect(createEditorState([{
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
    }])).toMatchSnapshot()
  })

  test('creates editor state with character data', () => {
    expect(createEditorState([{
      text: 'hello my friend',
      key: '1',
      characterRanges: [{
        start: 0,
        offset: 3,
        styles: ['bold']
      }, {
        start: 5,
        offset: 3,
        styles: ['italic'],
        entities: ['1']
      }]
    }])).toMatchSnapshot()
  })
})
