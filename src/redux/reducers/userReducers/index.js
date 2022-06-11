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
  UPDATE_CLASSROOMS,
  UPDATE_BRAND_COLOR,
  UPDATE_CHAT_ROOM,
  UPDATE_NOTIFICATIONS,
  UPDATE_TRAINERS,
  UPDATE_SUB_USER
} from "../../../Constants/Constants"

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
  classrooms: [],
  brandColor: "#429FBA",
  chatRooms: [],
  notifications: [],
  trainers: [],
  subUser: {}
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, auth: true }
    case UPDATE_USER:
      return { ...state, user: action.payload }
    case UPDATE_BRAND:
      return { ...state, brand: action.payload }
    case UPDATE_NOTIFICATIONS_SETTINGS:
      return { ...state, notificationsSetting: action.payload }
    case UPDATE_LANDING_PAGE:
      return { ...state, landingPage: action.payload }
    case UPDATE_LINKS:
      return { ...state, links: action.payload }
    case UPDATE_CHALLENGES:
      return { ...state, challenges: action.payload }
    case UPDATE_LIVE_CLASSES:
      return { ...state, liveClasses: action.payload }
    case UPDATE_VIDEOS:
      return { ...state, videos: action.payload }
    case UPDATE_CLASSROOMS:
      return { ...state, classrooms: action.payload }
    case UPDATE_BRAND_COLOR:
      return { ...state, brandColor: action.payload }
    case UPDATE_CHAT_ROOM:
      return { ...state, chatRooms: action.payload }
    case UPDATE_NOTIFICATIONS:
      return { ...state, notifications: action.payload }
    case UPDATE_TRAINERS:
      return { ...state, trainers: action.payload }
    case UPDATE_SUB_USER:
      return { ...state, subUser: action.payload }
    default:
      return state
  }
}

export default userReducer
