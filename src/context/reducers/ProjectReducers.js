import { SET_PROJECTS, SET_PROJECTS_NULL } from '../actions/projectactions';

const initialState = {
  projects: []
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    case SET_PROJECTS_NULL:
      return {
        ...state,
        projects: []
      };
    default:
      return state;
  }
};

export default projectReducer;
