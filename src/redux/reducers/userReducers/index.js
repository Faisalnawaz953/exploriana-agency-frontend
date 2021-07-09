import {
  LOGIN_SUCCESS,
  UPDATE_USER,
  UPDATE_BRAND,
  UPDATE_NOTIFICATIONS_SETTINGS,
  UPDATE_LANDING_PAGE,
} from "../../../Constants/Constants";

const initialState = {
  auth: true,
  user: {},
  brand: {},
  notificationsSetting: {},
  landingPage: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, auth: true };
    case UPDATE_USER:
      return { ...state, user: action.payload };
    case UPDATE_BRAND:
      return { ...state, brand: action.payload };
    case UPDATE_NOTIFICATIONS_SETTINGS:
      return { ...state, notificationsSetting: action.payload };
    case UPDATE_LANDING_PAGE:
      return { ...state, landingPage: action.payload };
    default:
      return state;
  }
};

export default userReducer;
