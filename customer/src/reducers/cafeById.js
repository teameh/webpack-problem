import { INVALIDATE_CAFE, REQUEST_CAFE, RECEIVE_CAFE } from '../actions/cafe'

const cafe = (state = {
    isFetching: false,
    hasFailed: false,
    didInvalidate: false,
    item: {}
}, action) => {
    switch (action.type) {
        case INVALIDATE_CAFE:
            return {
                ...state,
                didInvalidate: true
            };

        case REQUEST_CAFE:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            };

        case RECEIVE_CAFE:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                item: action.item
            };

        default:
            return state;
    }
};

const cafeById = (state = {}, action) => {
    switch (action.type) {
        case INVALIDATE_CAFE:
        case RECEIVE_CAFE:
        case REQUEST_CAFE:
            return {
                ...state,
                [action.id]: cafe(state[action.id], action)
            };

        default:
            return state;
    }
};

export default cafeById;
