const Slate = require('slate');
const isSelectionInFootnote = require('./utils/isSelectionInFootnote');

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
