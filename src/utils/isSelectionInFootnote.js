/**
 * Is the selection in a footnote
 *
 * @param {Object} options
 * @param {State} state
 */
module.exports = function isSelectionInFootnote(opts, state) {
    opts.typeFootnote = opts.typeFootnote || 'footnote';

    const { startBlock } = state;

    // Only handle events in cells
    return (startBlock.type === opts.typeFootnote);
};
