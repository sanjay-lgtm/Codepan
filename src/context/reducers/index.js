import { combineReducers }  from 'redux';
import userAuthReducers from './userAuthReducers';
import projectReducer from './ProjectReducers';

const myReducer = combineReducers({
    user:userAuthReducers,
    projects: projectReducer,
})

export default myReducer