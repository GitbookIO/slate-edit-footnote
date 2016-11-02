const makeSchema = require('./makeSchema');
const insertFootnote = require('./insertFootnote');

/**
 * @param {String} opts.typeFootnote type for the footnote block
 * @param {String} opts.typeRef type for the footnote ref
 */
function EditFootnote(opts = {}) {
    opts.typeFootnote = opts.typeFootnote || 'footnote';
    opts.typeRef = opts.typeRef || 'footnote_ref';

    const schema = makeSchema(opts);

    /**
     * Is the selection in a footnote
     */
    function isSelectionInFootnote(state) {
        const { startBlock } = state;

        // Only handle events in cells
        return (startBlock.type === opts.typeFootnote);
    }

    return {
        schema,

        transforms: {
            insertFootnote: insertFootnote.bind(null, opts)
        },

        // Prevent enter from doing anything in footnotes
        onKeyDown(event, data, state) {
            // Only handle key enter and events in footnotes
            if (data.key === 'enter' && isSelectionInFootnote(state)) {
                event.stopPropagation();
                event.preventDefault();
                return state;
            }
        }
    };
}

module.exports = EditFootnote;
