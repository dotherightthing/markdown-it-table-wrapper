/**
 * @file index.js
 * @summary markdown-it-table-wrapper
 * @description A markdown-it plugin for wrapping a table in a custom Vue component.
 * @see {@link https://github.com/markdown-it/markdown-it/issues/834#issue-1087866549} - new TokenConstructor
 * @see {@link https://github.com/markdown-it/markdown-it/issues/834#issuecomment-1001055989} - md.core.ruler.push
 * @see {@link https://github.com/markdown-it/markdown-it/issues/813#issuecomment-907311975} - state.tokens.splice
 * @see {@link https://github.com/markdown-it/markdown-it/blob/e843acc9edad115cbf8cf85e676443f01658be08/dist/markdown-it.js} - new state.Token
 */

class TableWrapperPlugin {
    constructor(md, options) {
        this.md = md;
        this.options = Object.assign({
          captionFromPrecedingSiblingTag: 'h3',
          captionLinerClass: 'caption-liner',
          tableWrapperClass: '',
          tableWrapperTag: 'TableWrapper',
        }, options);

        // Push new rule to the end of core chain, when all parser jobs done, but before renderer
        md.core.ruler.push('table', this.table.bind(this));
    }

    table(state) {
        const {
            captionFromPrecedingSiblingTag,
            captionLinerClass,
            tableWrapperClass,
            tableWrapperTag
        } = this.options;

        const tokens = state.tokens;
        const tables = [];
        let table = null;

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            
            if (token.type === 'table_open') {
                table = {};
                table.openToken = token;

                if (captionFromPrecedingSiblingTag) {
                    if ((tokens[i - 1].tag === captionFromPrecedingSiblingTag)) {
                        table.captionOpenToken = tokens[i - 3];
                        table.captionContentToken = tokens[i - 2];
                        table.captionCloseToken = tokens[i - 1];
                    }
                }
            } else if (token.type === 'table_close') {
                table.closeToken = token;
                tables.push(table);
                table = null;
            }
        }

        tables.forEach(table => {
            const {
                captionOpenToken,
                captionContentToken,
                captionCloseToken,
                openToken,
                closeToken
            } = table;

            if (!captionOpenToken || !captionContentToken || !captionCloseToken || !openToken || !closeToken) {
                return;
            }

            let insertPosition;

            const vueTokenOpen = new state.Token('html_block', '', 0); // tag, type, nesting
            const vueTokenClose = new state.Token('html_block', '', 0); // tag, type, nesting

            vueTokenOpen.content = `<${tableWrapperTag} class="${tableWrapperClass}">`;
            insertPosition = state.tokens.indexOf(openToken);
            state.tokens.splice(insertPosition, 0, vueTokenOpen);

            vueTokenClose.content = `</${tableWrapperTag}>`;
            insertPosition = state.tokens.indexOf(closeToken) + 1;
            state.tokens.splice(insertPosition, 0, vueTokenClose);

            const caption = captionContentToken.content;
            const captionToken = new state.Token('html_block', '', 1); // tag, type, nesting

            captionToken.content = `<caption><span class="${captionLinerClass}">${caption}</span></caption>`;
            insertPosition = state.tokens.indexOf(openToken) + 1;
            state.tokens.splice(insertPosition, 0, captionToken);

            // captionOpenToken.hidden = true;
            // captionContentToken.hidden = true;
            // captionCloseToken.hidden = true;
            captionOpenToken.attrSet('hidden', 'hidden');

            // if (captionContentToken.children.length) {
                // captionContentToken.children.forEach(child => {
                    // child.content = '';
                    // child.hidden = true;
                // });
            // }
        });
    }
}

module.exports = (md, options = {}) => new TableWrapperPlugin(md, options);
