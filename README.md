# React Variable Width Grid

[![npm](https://img.shields.io/npm/v/react-variable-width-grid "npm")](https://www.npmjs.com/package/react-variable-width-grid)

When you need to responsively lay out a dynamic number of dynamically sized items.

![Alt Text](./rvwg.gif)

### [Demo](https://mmartinsky.github.io/react-variable-width-grid/?path=/story/example--sandbox)

## Installation

`yarn add react-variable-width-grid`

`npm install react-variable-width-grid --save`

## Usage

```jsx
function App() {
  const items = [...Array(20).keys()].map((_, idx) => {
    if (idx % 5 === 0) {
      return <span key={idx}>Long Item {idx}</span>;
    }
    return <span key={idx}>Item {idx}</span>;
  });
  return <VariableWidthGrid>{items}</VariableWidthGrid>;
}
```

### With SSR

As this is a browser dependent library, we want to ensure that we are only rendering on the client side. To do so, you may import `VariableWidthGrid` as follows:

```
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('react-variable-width-grid'),
  { ssr: false }
);
```

If this is not imported in this way, the app may render a FOUC, Flash of Unstyled Content as it re-calculates the screen width

## Props

| Name      | Required | Type   | Default   | Description                              |
| --------- | -------- | ------ | --------- | ---------------------------------------- |
| children  | Y        | Node   | undefined | The children to display in a grid layout |
| columnGap | N        | number | 10        | The width of the column gap in px.       |
| style     | N        | CSSStyles | undefined          | Style overrides              |

The component will respect any additional props and spread them on the div.

## FAQ

### Why not use Flexbox?

Flexbox is awesome for one dimensional responsive wrapping, but aligning items within the "columns" is very difficult, unless you have fixed size items. You also need to apply some logic on margins, which feels clunky. At the time of writing, column-gap is not supported in Safari

### Why not use CSS Grid?

CSS Grid is great; adding an extra dimension onto flexbox is fantastic for everything from large scale app layouts to positioning icons. However, CSS Grid requires knowledge ahead of time on either a) the number of columns you want to render, or b) the size of each item.

Essentially, this component seeks to implement `grid-template-columns: repeat(auto-fill, max-content)`.

### Why is my component flashing a different layout in Next.JS / SSR?

If using SSR, you need to ensure any component using VariableWidthGrid is client side only. See above in Usage section for details.
