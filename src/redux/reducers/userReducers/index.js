import {
  LOGIN_SUCCESS,
  UPDATE_USER,
  UPDATE_BRAND,
  UPDATE_NOTIFICATIONS_SETTINGS,
  UPDATE_LANDING_PAGE,
  UPDATE_LINKS,
  UPDATE_CHALLENGES,
  UPDATE_LIVE_CLASSES,
  UPDATE_VIDEOS,
  UPDATE_CLASSROOMS
} from "../../../Constants/Constants";

const initialState = {
  auth: true,
  user: {},
  brand: {},
  notificationsSetting: {},
  landingPage: {},
  links: [],
  challenges: [],
  liveClasses: [],
  videos: [],
  classrooms: []
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
    case UPDATE_LINKS:
      return { ...state, links: action.payload };
    case UPDATE_CHALLENGES:
      return { ...state, challenges: action.payload };
    case UPDATE_LIVE_CLASSES:
      return { ...state, liveClasses: action.payload };
    case UPDATE_VIDEOS:
      return { ...state, videos: action.payload };
    case UPDATE_CLASSROOMS:
      return { ...state, classrooms: action.payload };
    default:
      return state;
  }
};

export default userReducer;
