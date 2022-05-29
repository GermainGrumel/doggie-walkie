export const setUserState = (payload: any) => {
  console.log("PAYLOAD", payload);
  return { type: "SET_USER_STATE", payload: payload };
};

export const setUserLocalisation = (payload: any) => {
  console.log("PAYLOAD", payload);
  return { type: "SET_USER_LOCALISATION", payload: payload };
};
