import { LOGIN_SUCCESS } from "../../../Constants/Constants";

export const login = (payload) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_SUCCESS, payload });
  };
};
