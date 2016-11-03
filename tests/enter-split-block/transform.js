module.exports = function(plugin, state) {
    const cursorBlock = state.document.getDescendant('_cursor_');

    state = state.transform()
        .moveToRangeOf(cursorBlock)
        .apply();

    return plugin.onKeyDown({
        stopPropagation: () => {},
        preventDefault: () => {}
    }, {
        key: 'enter'
    }, state);
};
