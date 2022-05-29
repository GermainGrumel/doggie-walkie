const defaultState = {};

export const authReducer = (
  state = defaultState,
  { type, payload }: { type: any; payload: any }
): any => {
  switch (type) {
    case "SET_USER_STATE":
      return {
        ...state,
        user: {
          email: payload.email,
          id: payload.uid,
          username: payload.displayName,
        },
      };
    case "SET_USER_LOCALISATION":
      return {
        ...state,
        position: {
          latitude: payload.latitude,
          longitude: payload.longitude,
        },
      };
  }
  return state;
};
