import { SET_USER, SET_USER_NULL } from "../actions/useractions";

const initialState = {
    user: null
  };
  
  const userAuthReducers = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER:
        return {
          ...state,
          user: action.payload // Use 'payload' to refer to the user data
        };
      case SET_USER_NULL:
        return {
          ...state,
          user: null // Set user to null
        };
      default:
        return state;
    }
  };
  
  export default userAuthReducers;
  