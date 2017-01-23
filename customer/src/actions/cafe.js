
/*
 * Actions
 */

export const SET_CAFE_ID = 'SET_CAFE_ID';

export const REQUEST_CAFE = 'REQUEST_CAFE';
export const RECEIVE_CAFE = 'RECEIVE_CAFE';
export const INVALIDATE_CAFE = 'INVALIDATE_CAFE';

/*
 * Action loaders
 */

export const setCafeId = (id) => ({
    type: SET_CAFE_ID,
    id
});

export const invalidateCafe = (id) => ({
    type: INVALIDATE_CAFE,
    id
});

export const requestCafe = (id) => ({
    type: REQUEST_CAFE,
    id
});

export const receiveCafe = (id, item) => ({
    type: RECEIVE_CAFE,
    receivedAt: Date.now(),
    id,
    item
});

const fetchCafe = id => dispatch => {
    let url = `https://nspetvbhpk.execute-api.us-east-1.amazonaws.com/prod/cafes/${id}`;
    let header = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    dispatch(requestCafe(id));
    return fetch(url, header)
        .then(response => response.json())
        .then(json => json.Item)
        .then(item => dispatch(receiveCafe(id, item)))
};

const shouldFetchCafe = (id, state) => {
    const cafe = state.cafeById[id];
    if (!cafe) {
        return true
    }
    if (cafe.isFetching) {
        return false
    }
    return cafe.didInvalidate
};

export const fetchCafeIfNeeded = id => (dispatch, getState) => {
    let shouldFetch = shouldFetchCafe(id, getState());
    console.log('fetchCafeIfNeeded: ' + (shouldFetch ? 'needed' : 'not needed'));
    if (shouldFetch) {
        return dispatch(fetchCafe(id));
    }
};
