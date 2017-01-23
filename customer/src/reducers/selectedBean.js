import { SET_BEAN_ID } from '../actions/bean'

const selectedBean = (state = {}, action) => {
    switch (action.type) {
        case SET_BEAN_ID:
            return action.id;
        default:
            return state;
    }
};

export default selectedBean;
