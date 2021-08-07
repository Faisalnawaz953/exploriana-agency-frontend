import axios from 'axios'
import { BASE_URL, NETWORK_ERROR } from '../Constants/Constants'

const token = localStorage.getItem('token')
const config = {
  headers: { Authorization: `Bearer ${token}` }
}
export const authService = async email => {
  try {
    return await axios.post(`${BASE_URL}users/login`, { email })
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const getAllUsers = async () => {
  try {
    return await axios.get(`${BASE_URL}users/`)
  } catch (error) {
    return NETWORK_ERROR
  }
}

export const updateFirebaseToken = async body => {
  try {
    return await axios.post(
      `${BASE_URL}users/update-device-token`,
      body,
      config
    )
  } catch (error) {
    return NETWORK_ERROR
  }
}

export const getSingleUser = async uid => {
  try {
    return await axios.get(`${BASE_URL}users/${uid}`, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}

export const register = async email => {
  try {
    return await axios.post(`${BASE_URL}users/register`, { email })
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const uploadImage = async formData => {
  try {
    return await axios({
      method: 'post',
      url: `${BASE_URL}users/upload-image`,
      data: formData,
      headers: {
        'Content-Type': `multipart/form-data`
      }
    })
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const registerProfile = async data => {
  try {
    return await axios.post(`${BASE_URL}users/register-profile`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}

export const updateProfile = async data => {
  try {
    return await axios.post(`${BASE_URL}users/profile`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const updateProfileImage = async data => {
  try {
    return await axios.post(
      `${BASE_URL}users/upload-profile-image`,
      data,
      config
    )
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const updateBrandImage = async data => {
  try {
    return await axios.post(`${BASE_URL}users/upload-brand-image`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}

export const addBrand = async data => {
  try {
    return await axios.post(`${BASE_URL}users/brand`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}

export const addChallange = async data => {
  try {
    return await axios.post(`${BASE_URL}challenges/create`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const getUserChallenges = async () => {
  try {
    return await axios.get(`${BASE_URL}challenges/`, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const updateUserChallenge = async (id, data) => {
  try {
    return await axios.patch(`${BASE_URL}challenges/update/${id}`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const deleteUserChallenge = async id => {
  try {
    return await axios.delete(`${BASE_URL}challenges/remove/${id}`, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}

export const addPaymentMethod = async id => {
  try {
    return await axios.get(`${BASE_URL}stripe/authorize`, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}

export const addTrainer = async data => {
  try {
    return await axios.post(`${BASE_URL}trainers/create`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}

export const updateTrainerImage = async data => {
  try {
    return await axios.post(
      `${BASE_URL}users/upload-trainer-image`,
      data,
      config
    )
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const updateImage = async data => {
  try {
    return await axios.post(`${BASE_URL}users/upload-image`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const updateNotificationSettings = async data => {
  try {
    return await axios.post(
      `${BASE_URL}users/notifications-settings`,
      data,
      config
    )
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const getBrandById = async userId => {
  try {
    return await axios.get(
      `${BASE_URL}users/brand/user/${userId}`,

      config
    )
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const getNotificationSettingsById = async userId => {
  try {
    return await axios.get(
      `${BASE_URL}users/notification-settings/${userId}`,

      config
    )
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const updateLandingPage = async data => {
  try {
    return await axios.post(`${BASE_URL}landings/add`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const getLandingPageById = async userId => {
  try {
    return await axios.get(
      `${BASE_URL}landings/user/${userId}`,

      config
    )
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const addClassRoom = async data => {
  try {
    return await axios.post(`${BASE_URL}classrooms/create`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const getUserClassRooms = async () => {
  try {
    return await axios.get(`${BASE_URL}classrooms/`, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const updateUserClassRoom = async (id, data) => {
  try {
    return await axios.patch(`${BASE_URL}classrooms/update/${id}`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const deleteUserClassRoom = async id => {
  try {
    return await axios.delete(`${BASE_URL}classrooms/remove/${id}`, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}

export const addVideo = async data => {
  try {
    return await axios.post(`${BASE_URL}videos/create`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const getUserVideos = async () => {
  try {
    return await axios.get(`${BASE_URL}videos/`, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const updateUserVideo = async (id, data) => {
  try {
    return await axios.patch(`${BASE_URL}videos/update/${id}`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const deleteUserVideo = async id => {
  try {
    return await axios.delete(`${BASE_URL}videos/remove/${id}`, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}

export const getUserLiveClasses = async () => {
  try {
    return await axios.get(`${BASE_URL}live-classroom/`, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const addLiveClass = async data => {
  try {
    return await axios.post(`${BASE_URL}live-classroom/create`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}

export const updateUserLiveClass = async (id, data) => {
  try {
    return await axios.patch(
      `${BASE_URL}live-classroom/update/${id}`,
      data,
      config
    )
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const deleteUserLiveClass = async id => {
  try {
    return await axios.delete(`${BASE_URL}live-classroom/remove/${id}`, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}

export const addLink = async data => {
  try {
    return await axios.post(`${BASE_URL}link/create`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const getUserLinks = async () => {
  try {
    return await axios.get(`${BASE_URL}link/`, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const updateUserLink = async (linkId, data) => {
  try {
    return await axios.patch(`${BASE_URL}link/update/${linkId}`, data, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}
export const deleteUserLink = async linkId => {
  try {
    return await axios.delete(`${BASE_URL}link/remove/${linkId}`, config)
  } catch (error) {
    return NETWORK_ERROR
  }
}

export const createNotification = async notification => {
  try {
    return await axios.post(
      `${BASE_URL}notifications/create`,
      notification,
      config
    )
  } catch (error) {
    return NETWORK_ERROR
  }
}
