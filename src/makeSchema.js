
/**
 * Create a schema for footnotes
 * @param {Object} opts
 * @return {Object} A schema definition with rules to normalize tables
 */
function makeSchema(opts) {
    return {
        rules: [
            footnotesInDocument(opts),
            footnotesAtTheEnd(opts)
        ]
    };
}

/**
 * Move a node to end of the document.
 * @param  {Transform} transform
 * @param  {Node} node
 * @return {Transform} transform
 */
function moveToDocumentEnd(transform, node) {
    const { state } = transform;
    const { document } = state;
    return transform.moveNodeByKey(node.key, document.key, document.nodes.size);
}

/**
 * Rule to enforce footnotes are in the document
 */
function footnotesInDocument(opts) {
    return {
        match(node) {
            return (node.kind === 'block');
        },
        validate(node) {
            const footnotes = node.nodes.filter(child => child.type === opts.typeFootnote);

            if (footnotes.isEmpty()) return;

            return {
                footnotes
            };
        },
        normalize(transform, node, { footnotes }) {
            return footnotes.reduce(moveToDocumentEnd, transform);
        }
    };
}

/**
 * Rule to enforce footnotes are at the end
 */
function footnotesAtTheEnd(opts) {
    const isFootnode = child => child.type === opts.typeFootnote;

    return {
        match(node) {
            return (node.kind === 'document');
        },
        validate(node) {
            const { nodes } = node;
            const footnotesAtEnd = nodes
                .reverse()
                .takeWhile(isFootnode);

            // Find all footnotes not at the end
            const lastNonFootnote = nodes.size - footnotesAtEnd.size;
            const invalids = nodes
                .slice(0, lastNonFootnote)
                .filter(isFootnode);

            if (invalids.size === 0) return;

            return {
                invalids
            };
        },
        normalize(transform, node, { invalids }) {
            return invalids.reduce(moveToDocumentEnd, transform);
        }
    };
}

module.exports = makeSchema;
