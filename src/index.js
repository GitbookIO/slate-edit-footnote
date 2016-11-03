const makeSchema = require('./makeSchema');
const insertFootnote = require('./insertFootnote');
const isSelectionInFootnote = require('./utils/isSelectionInFootnote');

/**
 * @param {String} opts.typeFootnote type for the footnote block
 * @param {String} opts.typeRef type for the footnote ref
 */
function EditFootnote(opts = {}) {
    opts.typeFootnote = opts.typeFootnote || 'footnote';
    opts.typeRef = opts.typeRef || 'footnote_ref';
    opts.defaultBlock = opts.defaultBlock || 'paragraph';

    const schema = makeSchema(opts);

    return {
        schema,

        isSelectionInFootnote: isSelectionInFootnote.bind(null, opts),

        transforms: {
            insertFootnote: insertFootnote.bind(null, opts)
        },

        // Prevent enter from doing anything in footnotes
        onKeyDown(event, data, state) {
            // Only handle key enter and events in footnotes
            if (data.key === 'enter' && isSelectionInFootnote(opts, state)) {
                event.stopPropagation();
                event.preventDefault();

                const transform = state.transform();

                return transform
                    .collapseToEndOf(state.startBlock)
                    .splitBlock()
                    .setBlock({ type: opts.defaultBlock, data: {} })
                    .moveNodeByKey(
                        transform.state.document.getPreviousBlock(transform.state.startBlock.key),
                        transform.state.document.key,
                        transform.state.document.nodes.size
                    )
                    .apply();
            }
        }
    };
}

module.exports = EditFootnote;
