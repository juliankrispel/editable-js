// @flow
import createEditorState from '../createEditorState'

describe('createEditorState', () => {
  test('creates editor state with nested structure', () => {
    expect(createEditorState({ blocks: [{
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
    }]})).toMatchSnapshot()
  })

  test('creates editor state with character data', () => {
    expect(createEditorState({ blocks: [{
      text: 'hello my friend',
      key: '1',
      characterRanges: [{
        offset: 0,
        length: 3,
        marks: ['bold']
      }, {
        offset: 5,
        length: 3,
        marks: ['italic', '1']
      }]
    }]})).toMatchSnapshot()
  })
})
