# editable-js

> A framework for rich text editing


## Updates

```js
const newEditorState = commit(
  editorState,
  draft => {
    // mutate away
  },
)
```

## Rendering Blocks

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
  renderBlock={({ block, children }}) => {
    const { characterData } = block
    return <div>
    </div>
  }}
/>

```
