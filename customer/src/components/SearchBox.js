import React, { Component, PropTypes } from 'react'
import Suggestions from './Suggestions'
import classNames from 'classnames';

const keyCodes = {
    ENTER: 13,
    ESCAPE: 27,
    UP: 38,
    DOWN: 40
};

class SearchBox extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props) {
        super(props);

        if (props.showSuggestions && !props.onChange) {
            throw new Error('You must supply a callback to <onChange>.');
        }

        this.state = this.initialState = {
            highlightedItem: -1,
            searchTerm: '',
            suggestions: [],
            value: ''
        };
    }

    componentDidMount() {
        if (this.props.autoFocus) {
            this.refs.input.focus();
        }

        if (this.props.defaultValue) {
            this.setState({
                value: this.props.defaultValue
            });
        }
    }

    normalizeInput() {
        return this.state.value.toLowerCase().trim();
    }

    autosuggest() {
        if (!this.props.showSuggestions) {
            return;
        }

        const searchTerm = this.normalizeInput();

        if (!searchTerm) {
            return;
        }

        new Promise((resolve) => {
            this.props.onChange(searchTerm, resolve);
        }).then((suggestions) => {
            if (!this.state.value) {
                return;
            }
            this.setState({
                highlightedItem: -1,
                searchTerm,
                suggestions
            })
        })
    }

    scroll(key) {
        const {highlightedItem: item, suggestions} = this.state;
        const lastItem = suggestions.length - 1;
        let nextItem;

        if (key === keyCodes.UP) {
            nextItem = (item <= 0) ? lastItem : item - 1;
        } else {
            nextItem = (item === lastItem) ? 0 : item + 1;
        }

        this.setState({
            highlightedItem: nextItem,
            value: suggestions[nextItem]
        })
    }

    onChange(e) {
        clearTimeout(this.timer);
        const input = e.target.value;
        if (!input) {
            return this.setState(this.initialState);
        }
        this.setState({value: input});
        this.timer = setTimeout(() => this.autosuggest(), this.props.delay);
    }

    onKeyDown(e) {
        const key = e.which || e.keyCode;
        switch (key) {
            case keyCodes.UP:
            case keyCodes.DOWN:
                e.preventDefault();
                this.scroll(key);
                break;

            case keyCodes.ENTER:
                this.search();
                break;

            case keyCodes.ESCAPE:
                this.refs.input.blur();
                break;

            default:
                break;
        }
    }

    onSelection(suggestion) {
        this.setState({value: suggestion}, () => this.search());
    }

    onSearch(e) {
        e.preventDefault();
        this.search();
    }

    search() {
        if (!this.state.value) {
            return;
        }
        const value = this.normalizeInput();

        clearTimeout(this.timer);

        this.refs.input.blur();
        const {highlightedItem, suggestions} = this.initialState;
        this.setState({highlightedItem, suggestions});
        if (this.props.onSearch) {
            this.props.onSearch(value);
        }
    }

    render () {
        return (
            <div className="input-group col-sm-4 search-box">
                <div className="search-bar-wrapper">
                    <div className={classNames(
                        'search-bar-field',
                        {'is-focused': this.state.isFocused},
                        {'has-suggestions': this.state.suggestions.length > 0})}>
                        <input
                            className="search-bar-input"
                            name={this.props.inputName}
                            type="text"
                            maxLength="100"
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect="off"
                            ref="input"
                            value={this.state.value}
                            placeholder={this.props.placeholder}
                            onChange={this.onChange.bind(this)}
                            onBlur={() => this.setState({isFocused: false, suggestions: []})}
                            onKeyDown={this.state.suggestions && this.onKeyDown.bind(this)}
                            onFocus={() => this.setState({isFocused: true})} />
                        { this.state.value &&
                            <span
                                className="icon search-bar-clear"
                                onClick={() => this.setState(this.initialState)}
                            >
                            </span>
                        }
                        <input
                            className="icon search-bar-submit"
                            type="submit"
                            onClick={this.onSearch.bind(this)} />
                    </div>
                    { this.props.showSuggestions && this.state.suggestions.length > 0 &&
                        <Suggestions
                            searchTerm={this.state.searchTerm}
                            suggestions={this.state.suggestions}
                            highlightedItem={this.state.highlightedItem}
                            onSelection={this.onSelection.bind(this)} />
                    }
                </div>
            </div>
        );
    }
}

SearchBox.propTypes = {
    showSuggestions: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    delay: React.PropTypes.number,
    inputName: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onSearch: React.PropTypes.func,
    placeholder: React.PropTypes.string
};

SearchBox.defaultProps = {
    showSuggestions: false,
    autoFocus: true,
    delay: 200
};

export default SearchBox;
