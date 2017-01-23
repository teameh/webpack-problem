import { SET_SEARCH_QUERY } from '../actions/search'

const searchQuery = (state = '', action) => {
    switch (action.type) {
        case SET_SEARCH_QUERY:
            return action.query;
        default:
            return state;
    }
};

export default searchQuery;
