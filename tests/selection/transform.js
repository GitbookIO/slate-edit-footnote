const expect = require('expect');

module.exports = function(plugin, state) {
    const cursorBlock = state.document.getDescendant('_cursor_');

    state = state.transform()
        .moveToRangeOf(cursorBlock)
        .apply();

    state = plugin.transforms.insertFootnote(state.transform()).apply();

    const selection = state.selection;
    expect(selection.startOffset).toEqual(0);
    expect(selection.endOffset).toEqual(20);
    expect(selection.isFocused).toEqual(true);

    return state;
};
