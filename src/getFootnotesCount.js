const listNodesOfType = require('./listNodesOfType');

/**
 * Return counts of all footnotes in the document
 * @return {Number} counts
 */
function getFootnotesCount(opts, state) {
    const footnotes = listNodesOfType(state, opts.typeFootnote);
    return footnotes.size;
}

module.exports = getFootnotesCount;
