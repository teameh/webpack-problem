/*
 * Action types
 */

export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

export const REQUEST_RESULTS = 'REQUEST_RESULTS';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const INVALIDATE_RESULTS = 'INVALIDATE_RESULTS';

/*
 * Action loaders
 */

export const setSearchQuery = (query) => ({
    type: SET_SEARCH_QUERY,
    query
});

export const invalidateResults = () => ({
    type: INVALIDATE_RESULTS
});

export const requestResults = () => ({
    type: REQUEST_RESULTS
});

export const receiveResults = (hit) => ({
    type: RECEIVE_RESULTS,
    items: hit,
    receivedAt: Date.now()
});

const fetchResults = query => dispatch => {
    dispatch(requestResults());
    return fetch(`https://dkedjs4vvb.execute-api.us-east-1.amazonaws.com/prod/search?q=${query}`)
        .then(response => response.json())
        .then(json => json.hits)
        .then(hits => hits.hit)
        .then(hit => dispatch(receiveResults(hit)))
};

const shouldFetchResults = (state) => {
    const results = state.searchResults;
    if (!results) {
        return true;
    }
    if (results.isFetching) {
        return false;
    }
    return results.didInvalidate;
};

export const fetchResultsIfNeeded = query => (dispatch, getState) => {
    let shouldFetch = shouldFetchResults(getState());
    console.log('fetchResultsIfNeeded: ' + (shouldFetch ? 'needed' : 'not needed'));
    if (shouldFetchResults(getState())) {
        return dispatch(fetchResults(query));
    }
};
