const Slate = require('slate');
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

                const { document } = state;

                // Find first footnote index for a footnote in the document
                const firstFootnoteIndex = document.nodes.findKey((node) => {
                    return node.type === opts.typeFootnote;
                });

                // Create an empty block of type defaultBlock
                const block = Slate.Block.create({
                    type: opts.defaultBlock,
                    data: {}
                });

                return state.transform()
                    .insertNodeByKey(document.key, firstFootnoteIndex, block)
                    .moveToRangeOf(block)
                    .apply();
            }
        }
    };
}

module.exports = EditFootnote;
