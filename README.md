# markdown-it-vuepress-table

A [markdown-it](https://github.com/markdown-it/markdown-it) plugin for wrapping a table with a custom Vue component. For use with Vuepress.

I find this preferable to using a Vue component directly in the Vuepress markdown file. Tables are core content and should be visible when editing content in a pluggable IDE without requiring Vuepress for compilation.

Based on <https://github.com/dotherightthing/markdown-it-vuepress-table>.

## Usage

### Options

| Option                           | Type    | Default         | Description                                                                                   |
|----------------------------------|---------|-----------------|-----------------------------------------------------------------------------------------------|
| captionFromPrecedingHeadingLevel | String  | "h3"            | Reuse the caption from the preceding sibling heading element (rather than providing a string) |
| captionLinerClass                | String  | "caption-liner" | CSS class to apply to the injected caption element                                            |
| vueTableTag                      | String  | "TableWrapper"  | Name of the Vue component (authored separately)                                               |

### Example

```js
// .vuepress/config.js

module.exports = {
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-vuepress-table'))
    }
  }
}
```

```vue
// .vuepress/components/TABLE.vue (simplified example)

// TODO
```

#### Input markdown

```md
TODO
```

#### Output HTML

```html
<!-- TODO -->
```
