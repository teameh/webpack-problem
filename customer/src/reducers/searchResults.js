import { REQUEST_RESULTS, RECEIVE_RESULTS, INVALIDATE_RESULTS } from '../actions/search'

const searchResults = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case INVALIDATE_RESULTS:
            return {
                ...state,
                didInvalidate: true
            };

        case REQUEST_RESULTS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            };

        case RECEIVE_RESULTS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.items,
                lastUpdated: action.receivedAt
            };

        default:
            return state;
    }
};

export default searchResults;
