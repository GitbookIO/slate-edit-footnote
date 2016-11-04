const onKeyDown = require('./onKeyDown');
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

        onKeyDown: onKeyDown.bind(null, opts),

        isSelectionInFootnote: isSelectionInFootnote.bind(null, opts),

        transforms: {
            insertFootnote: insertFootnote.bind(null, opts)
        }
    };
}

module.exports = EditFootnote;
