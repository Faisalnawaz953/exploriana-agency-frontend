export const BASE_URL = 'http://localhost:5000/api/'
// export const BASE_URL = "https://movee-app-backend.herokuapp.com/api/";
export const NETWORK_ERROR = 'NETWORK_ERROR'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_BRAND = 'UPDATE_BRAND'
export const UPDATE_NOTIFICATIONS_SETTINGS = 'UPDATE_NOTIFICATIONS_SETTINGS'
export const UPDATE_LANDING_PAGE = ' UPDATE_LANDING_PAGE'
export const UPDATE_LINKS = 'UPDATE_LINKS'
export const UPDATE_CHALLENGES = 'UPDATE_CHALLENGES'
export const UPDATE_LIVE_CLASSES = 'UPDATE_LIVE_CLASSES'
export const UPDATE_VIDEOS = 'UPDATE_VIDEOS'
export const UPDATE_CLASSROOMS = 'UPDATE_CLASSROOMS'
export const UPDATE_BRAND_COLOR = 'UPDATE_BRAND_COLOR'
export const UPDATE_CHAT_ROOM = 'UPDATE_CHAT_ROOM'
export const BRAND_COLOR = localStorage.getItem('BrandColor')
  ? localStorage.getItem('BrandColor')
  : '#429FBA'
