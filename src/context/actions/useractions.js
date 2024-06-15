// Define action types

// Action creator for setting user
export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const setUserNull = () => ({
  type: 'SET_USER_NULL',
});

