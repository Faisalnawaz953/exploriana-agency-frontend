import { LOGIN_SUCCESS } from "../../../Constants/Constants";

const initialState = {
  auth: null,
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, auth: true };

    default:
      return state;
  }
};

export default userReducer;
