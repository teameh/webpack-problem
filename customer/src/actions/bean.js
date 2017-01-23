
/*
 * Actions
 */

export const SET_BEAN_ID = 'SET_BEAN_ID';

export const REQUEST_BEAN = 'REQUEST_BEAN';
export const RECEIVE_BEAN = 'RECEIVE_BEAN';
export const INVALIDATE_BEAN = 'INVALIDATE_BEAN';

/*
 * Action loaders
 */

export const setBeanId = (id) => ({
    type: SET_BEAN_ID,
    id
});

export const invalidateBean = (id) => ({
    type: INVALIDATE_BEAN,
    id
});

export const requestBean = (id) => ({
    type: REQUEST_BEAN,
    id
});

export const receiveBean = (id, item) => ({
    type: RECEIVE_BEAN,
    receivedAt: Date.now(),
    id,
    item
});

const fetchBean = id => dispatch => {
    let url = `https://nspetvbhpk.execute-api.us-east-1.amazonaws.com/prod/beans/${id}`;
    let header = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    dispatch(requestBean(id));
    return fetch(url, header)
        .then(response => response.json())
        .then(json => json.Item)
        .then(item => dispatch(receiveBean(id, item)))
};

const shouldFetchBean = (id, state) => {
    const bean = state.beanById[id];
    if (!bean) {
        return true
    }
    if (bean.isFetching) {
        return false
    }
    return bean.didInvalidate
};

export const fetchBeanIfNeeded = id => (dispatch, getState) => {
    let shouldFetch = shouldFetchBean(id, getState());

    console.log('fetchBeanIfNeeded: ' + (shouldFetch ? 'needed' : 'not needed'));

    if (shouldFetch) {
        return dispatch(fetchBean(id));
    }
};
