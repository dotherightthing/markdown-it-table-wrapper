# markdown-it-table-wrapper

A [markdown-it](https://github.com/markdown-it/markdown-it) plugin for wrapping a table with a custom Vue component. For use with Vuepress.

I find this preferable to using a Vue component / [named Markdown slot](https://vuepress.vuejs.org/guide/markdown-slot.html) directly in the Vuepress markdown file.

## Usage

<a name="TableWrapperPlugin"></a>

## TableWrapperPlugin
**Kind**: global class  
**Summary**: Wraps table in a Vue component and injects an HTML caption  
**Access**: public  
<a name="new_TableWrapperPlugin_new"></a>

### new TableWrapperPlugin(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | Instance options |
| [options.captionFromPrecedingSiblingTag] | <code>string</code> | <code>&quot;p&quot;</code> | Tag of a preceding element to pull caption text from |
| [options.captionLinerClass] | <code>string</code> | <code>&quot;caption-liner&quot;</code> | CSS class hook for styling the table caption |
| [options.tableWrapperClass=] | <code>string</code> |  | CSS class hook for styling the table wrapper |
| [options.tableWrapperTag] | <code>string</code> | <code>&quot;TableWrapper&quot;</code> | Tag name for the table wrapper (or name of the Vue component, authored separately) |


### Example

```js
// .vuepress/config.js

module.exports = {
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-table-wrapper'), {
        captionFromPrecedingSiblingTag: 'h3',
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

<script>
export default {
  name: 'TableWrapper',
}
</script>
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
