import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setSearchQuery, fetchResultsIfNeeded, invalidateResults } from '../actions/search'
import SearchView from '../components/Search/SearchView'

export class DoSearch extends Component {

    static propTypes = {
        query: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    };

    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        const { query, dispatch } = this.props;
        dispatch(setSearchQuery(query));
        dispatch(invalidateResults());
        dispatch(fetchResultsIfNeeded(query));
    }

    onChange(input, resolve) {
    }

    onSearch(input) {
        let path = 'search?q=' + input;
        this.context.router.push(path);

        const { dispatch } = this.props;
        dispatch(setSearchQuery(input));
        dispatch(invalidateResults());
        dispatch(fetchResultsIfNeeded(input));
    }

    render() {
        const { query, items, isFetching } = this.props;
        return (
            <SearchView
                query={query}
                items={items}
                isFetching={isFetching}
                onSearch={this.onSearch.bind(this)}
                onChange={this.onChange.bind(this)}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let query = '';
    if (ownProps.location.query !== 'undefined') {
        query = ownProps.location.query['q'] || '';
    }

    const { searchResults } = state;

    const {
        items,
        isFetching
    } = searchResults;

    return {
        query,
        items,
        isFetching
    }
};

export default connect(mapStateToProps)(DoSearch);
