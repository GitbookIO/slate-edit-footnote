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
        },

        // Prevent enter from doing anything in footnotes
        // onKeyDown(event, data) {
        //     console.log('event', event, data);
        //
        //     if (data.key === 'enter') {
        //         console.log('prevent default');
        //         event.stopPropagation();
        //         event.preventDefault();
        //     }
        // }
    };
}

module.exports = EditFootnote;
