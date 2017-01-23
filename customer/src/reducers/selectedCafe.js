import { SET_CAFE_ID } from '../actions/cafe'

const selectedCafe = (state = {}, action) => {
    switch (action.type) {
        case SET_CAFE_ID:
            return action.id;
        default:
            return state;
    }
};

export default selectedCafe;
