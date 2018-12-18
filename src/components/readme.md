# Editor Components

## Editor

### Props:

- `renderBlock`

- `renderFragment`

## EditorBlock

## EditorFragment




### Example
```
<Editor
renderBlock={({ block }) => {
  const decoratedBlock = block
  return <Fragment>
    <EditorText />
    <EditorBlockChildren />
  </Fragment>
}}
/>
```
