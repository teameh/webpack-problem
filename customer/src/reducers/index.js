import { combineReducers } from 'redux'
import searchQuery from './searchQuery'
import searchResults from './searchResults'
import selectedCafe from './selectedCafe'
import selectedBean from './selectedBean'
import cafeById from './cafeById'
import beanById from './beanById'

const rootReducer = combineReducers({
    searchQuery,
    searchResults,
    selectedCafe,
    selectedBean,
    cafeById,
    beanById
});

export default rootReducer
