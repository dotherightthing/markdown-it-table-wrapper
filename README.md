# markdown-it-table-wrapper

A [markdown-it](https://github.com/markdown-it/markdown-it) plugin for wrapping a table with a custom Vue component. For use with Vuepress.

I find this preferable to using a Vue component directly in the Vuepress markdown file. Tables are core content and should be visible when editing content in a pluggable IDE without requiring Vuepress for compilation.

Based on <https://github.com/dotherightthing/markdown-it-table-wrapper>.

## Usage

### Options

| Option                           | Type    | Default         | Description                                                                                   |
|----------------------------------|---------|-----------------|-----------------------------------------------------------------------------------------------|
| captionFromPrecedingHeadingLevel | String  | "h3"            | Reuse the caption from the preceding sibling heading element (rather than providing a string) |
| captionLinerClass                | String  | "caption-liner" | CSS class hook for styling the table caption                                                  |
| tableWrapperClass                | String  | ""              | CSS class hook for styling the table wrapper / table                                          |
| tableWrapperTag                  | String  | "TableWrapper"  | Tag name (or name of the Vue component, authored separately)                                  |

### Example

```js
// .vuepress/config.js

module.exports = {
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-table-wrapper'), {
        captionFromPrecedingHeadingLevel: 'h3',
        captionLinerClass: 'caption-liner',
        tableWrapperClass: '',
        tableWrapperTag: 'TableWrapper',
      })
    }
  }
}
```

```vue
// .vuepress/components/TableWrapper.vue (simplified example)

<template>
  <div class="table-wrapper">
    <slot/>
  </div>
</template>
```

#### Input markdown

```md
### Animals I've Known

| Animal | Color  | Name      |
|--------|--------|-----------|
| Cat    | Ginger | Gingernut |
```

#### Output HTML

```html
<div class="table-wrapper">
  <table>
    <caption>
      <span class="caption-liner">Animals I've Known</span>
    </caption>
    <thead>
      <tr>
        <th>Animal</th>
        <th>Color</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Cat</td>
        <td>Ginger</td>
        <td>Gingernut</td>
      </tr>
    </tbody>
  </table>
</div>
```
