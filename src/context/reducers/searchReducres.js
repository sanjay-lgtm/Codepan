import { SET_SEARCH_TERM, SET_SEARCH_TERM_EMPTY } from '../actions/searchactions';

const initialState = {
  searchTerm: ''
};

const searchReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };
    case SET_SEARCH_TERM_EMPTY:
      return {
        ...state,
        searchTerm: ''
      };
    default:
      return state;
  }
};

export default searchReducers;
