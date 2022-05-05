export const setUser = (user: any) => {
  console.log("userActions", user);

  return (dispatch: any, getState: any) => {
    dispatch({ type: "SET_USER", user: user });
  };
};
