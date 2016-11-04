const Slate = require('slate');
const isSelectionInFootnote = require('./utils/isSelectionInFootnote');

/**
 * Prevent enter from splitting footnotes block and apply a transform to add a
 * paragraph at the end of the document, right before the first foonote.
 *
 * @param {Object} opts  - options
 * @param {Object} event - event object
 * @param {Object} data  - slate data
 * @param {Object} state - slate state
 *
 */
module.exports = function onKeyDown(opts, event, data, state) {
    if (!(data.key === 'enter' && isSelectionInFootnote(opts, state))) {
        return;
    }

    // Only handle key enter and events in footnotes
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
};
