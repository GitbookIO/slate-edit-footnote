const Slate = require('slate');
const getFootnotesCount = require('./getFootnotesCount');

const DEFAULT_TEXT = 'Enter footnote here.';

/**
 * Insert a footnote at end of selection:
 *     1. Insert an entity "footnote-ref"
 *     2. Insert a block at the end of the document, of type "footnote"
 *
 * @param  {Object} opts
 * @param  {Slate.Transform} transform
 * @param  {String} defaultText
 * @return {Slate.Transform}
 */
function insertFootnote(opts, transform, defaultText = DEFAULT_TEXT) {
    const { state }   = transform;
    const footnotes   = getFootnotesCount(opts, state);
    const footnodeRef = String(footnotes + 1);

    const { document } = state;
    const lastIndex = document.nodes.count();
    let footnote = Slate.Block.create({
        type: opts.typeFootnote,
        data: { id: footnodeRef },
        nodes: [Slate.Text.create()]
    });

    transform = transform
        .collapseToEnd()
        .insertInline({
            type: opts.typeRef,
            isVoid: true,
            data: {
                id: footnodeRef
            }
        })
        .insertNodeByKey(document.key, lastIndex, footnote)
        .moveToRangeOf(footnote)
        .insertText(defaultText);

    // Updated footnote
    footnote = transform.state.document.getDescendant(footnote.key);
    // Focus the text
    transform = transform
        .moveToRangeOf(footnote);

    return transform.apply();
}

module.exports = insertFootnote;
