// Define action types
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const SET_SEARCH_TERM_EMPTY = "SET_SEARCH_TERM_EMPTY";

// Action creator for setting the search term
export const setSearch = (searchTerm) => {
  return {
    type: SET_SEARCH_TERM,
    payload: searchTerm,
  };
};

// Action creator for clearing the search term
export const setSearchNull = () => {
  return {
    type: SET_SEARCH_TERM_EMPTY,
  };
};
