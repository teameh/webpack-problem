import { INVALIDATE_BEAN, REQUEST_BEAN, RECEIVE_BEAN } from '../actions/bean'

const bean = (state = {
    isFetching: false,
    hasFailed: false,
    didInvalidate: false,
    item: {}
}, action) => {
    switch (action.type) {
        case INVALIDATE_BEAN:
            return {
                ...state,
                didInvalidate: true
            };

        case REQUEST_BEAN:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            };

        case RECEIVE_BEAN:
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

const beanById = (state = {}, action) => {
    switch (action.type) {
        case INVALIDATE_BEAN:
        case RECEIVE_BEAN:
        case REQUEST_BEAN:
            return {
                ...state,
                [action.id]: bean(state[action.id], action)
            };

        default:
            return state;
    }
};

export default beanById;
