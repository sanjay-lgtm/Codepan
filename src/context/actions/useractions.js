// Define action types
export const SET_USER = "SET_USER";
export const SET_USER_NULL = "SET_USER_NULL";

// Action creator for setting user
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user // Use 'payload' to refer to the user data
  }
}

// Action creator for clearing user
export const setUserNull = () => {
  return {
    type: SET_USER_NULL
  }
}
