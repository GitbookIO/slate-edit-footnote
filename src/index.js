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

    return {
        schema,

        transforms: {
            insertFootnote: insertFootnote.bind(null, opts)
        }
    };
}

module.exports = EditFootnote;
