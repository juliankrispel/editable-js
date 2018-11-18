# editable-js

> A framework for rich text editing


## Updates

```js

```

## Examples

### Styling text

Whether it's styling text, or adding entities, this can be done via updating character data. This is completely agnostic.

```jsx
const newEditorState = update(editorState, (draftEditorState) => {
  updateCharacterData(
    draftEditorState,
    selection,
    (character, index) => ({
      ...character,
      style: 'BOLD'
    })
  )
})
```

### Decorators

Decorators can be simply expressed at the render level

```jsx
<Editor
  renderBlock={(block) => {
    const { characterData } = block
    return <div>
    </div>
  }}
  renderCharacterRange={() => {

  }}
/>

```
