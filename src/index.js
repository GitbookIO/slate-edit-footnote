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

    const schema = makeSchema(opts);

    return {
        schema,

        transforms: {
            insertFootnote: insertFootnote.bind(null, opts)
        },

        // Prevent enter from doing anything in footnotes
        onKeyDown(event, data, state) {
            // Only handle key enter and events in footnotes
            if (data.key === 'enter' && isSelectionInFootnote(opts, state)) {
                event.stopPropagation();
                event.preventDefault();
                return state;
            }
        }
    };
}

// Expose isSelectionInFootnote utility
EditFootnote.isSelectionInFootnote = isSelectionInFootnote;

module.exports = EditFootnote;
