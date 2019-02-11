# Rendering

User should be able to use render prop for rendering __blocks__

```
import { EditableBlock } from 'editable-js'

renderBlock={({ block }) => {
  if (block.type === 'image') {
    return <img src={block.data.src} src={block.data.src}/>
  }

  // You can manipulate fragments here if you want t
  // For example decorators!
  fragments = block.characterData.map(manipulateCharData)

  return <div>
    <EditableBlock {...block} fragments={fragments}/>
  </div>
}}
```

As well as fragments 

```
import { EditableFragment } from 'editable-js'

renderFragment={({ fragment, children }) => {
  if (fragment.type === 'image') {
    return <img src={block.data.src} src={block.data.src}/>
  }

  return <span>
    {children}
  </span>
}}
```

# Keydown interactions

- [ ] redo
- [ ] undo
- [ ] delete
- [ ] delete-word
- [ ] backspace
- [ ] backspace-word
- [ ] backspace-to-start-of-line
- [ ] split-block (return)
- [ ] transpose-characters
- [ ] move-selection-up
- [ ] move-selection-down
- [ ] move-selection-to-start-of-block
- [ ] move-selection-to-end-of-block
- [ ] secondary-cut
- [ ] secondary-paste

# Tree Mutations

When running mutations with a non-collapsed selection we need to account for block position as well as length, hence I'm writing out the running order of commands here:

## Deleting a block
- Delete a block and it's children get deleted too

## Joining two blocks
1. Join text value (string) and characterData arrays
2. Join children nodes
3. Merge data objects (first block wins)
- Blocks have to be of same type (throw error if not)

```
A {
  text: 'Hello'
  children: [A1, A2, A3]
}

B {
  text: ' World'
  children: [B1, B2, B3]
}

(A - B) {
  text: 'Hello World',
  children: [A1, A2, A3, B1, B2, B3]
}
```

## Deleting/cutting a range
1. Get block map
1. Get list of blocks in range `getBlocksAndPaths()`
2. Join the start and the end block
3. Delete all blocks in between

## Replacing a range with text
1. Delete range
2. Insert text

## Replacing a selection of content state with a content state fragment
1. Splice content
2. Join adjacent content blocks (of the three content state fragments).

```
// Join Content States A, B and C
A1 --- (A2 - B1) --- (B2 - C1) --- C1
```

## Moving a range

## Pasting a range

# Queries

- Getting flat list of blocks (including their paths) (pass selection for a framgnet of the content state)
  ^ Memoize this since it'll be used a lot
- Get block by key
- Get parent block
-
