const React = require('react');
const ReactDOM = require('react-dom');
const Slate = require('slate');
const FootnotePlugin = require('../src');

const stateJson = require('./state');

const footnotePlugin = FootnotePlugin();
const plugins = [
    footnotePlugin
];

const schema = {
    nodes: {
        // footnote_ref: FootnoteRef,
        footnote_ref: props => <sup>{props.node.data.get('id')}</sup>,
        footnote:     props => <div className="footnote">{props.node.data.get('id')}: {props.children}</div>,
        paragraph:    props => <p {...props.attributes}>{props.children}</p>,
        heading:      props => <h1 {...props.attributes}>{props.children}</h1>
    }
};

schema.nodes.paragraph.propTypes = schema.nodes.heading.propTypes = {
    attributes: React.PropTypes.object.isRequired,
    children:   React.PropTypes.node.isRequired
};

schema.nodes.footnote_ref.propTypes = {
    node: React.PropTypes.object.isRequired
};

schema.nodes.footnote.propTypes = {
    node:     React.PropTypes.object.isRequired,
    children: React.PropTypes.node.isRequired
};

const Toolbar = React.createClass({
    propTypes: {
        onInsertFootnote: React.PropTypes.func.isRequired
    },

    render() {
        return (
            <div>
                <button onClick={this.props.onInsertFootnote}>Insert Footnote</button>
            </div>
        );
    }
});

const Example = React.createClass({
    getInitialState() {
        return {
            state: Slate.Raw.deserialize(stateJson, { terse: true })
        };
    },

    onChange(state) {
        this.setState({
            state
        });
    },

    onInsertFootnote(e) {
        const { state } = this.state;

        this.onChange(
            footnotePlugin.transforms.insertFootnote(state.transform()).focus().apply()
        );
    },

    render() {
        const { state } = this.state;

        return (
            <div>
                <Toolbar
                    onInsertFootnote={this.onInsertFootnote}
                />

                <Slate.Editor
                    placeholder={'Enter some text...'}
                    plugins={plugins}
                    state={state}
                    onChange={this.onChange}
                    schema={schema}
                />
            </div>
        );
    }
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);
