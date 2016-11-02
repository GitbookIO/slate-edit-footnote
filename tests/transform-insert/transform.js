const Slate = require('slate');

module.exports = function(plugin, state) {
    const cursor = state.selection.merge({
        anchorKey: '_cursor_',
        focusKey: '_cursor_',
        anchorOffset: 6,
        focusOffset: 6
    })
    const schema = new Slate.Schema(plugin.schema);

    return plugin.transforms.insertFootnote(
        state.transform()
        .moveTo(cursor)
    )
    .apply()
};
