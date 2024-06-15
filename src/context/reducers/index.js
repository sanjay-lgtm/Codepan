import { combineReducers }  from 'redux';
import userAuthReducers from './userAuthReducers';
import projectReducer from './ProjectReducers';
import searchReducers from './searchReducres';

const myReducer = combineReducers({
    user:userAuthReducers,
    projects: projectReducer,
    searchTerm:searchReducers
})

export default myReducer