import axios from "axios";
import { BASE_URL, NETWORK_ERROR } from "../Constants/Constants";

const token = localStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};
export const authService = async (email) => {
  try {
    return await axios.post(`${BASE_URL}users/login`, { email });
  } catch (error) {
    return NETWORK_ERROR;
  }
};

export const register = async (email) => {
  try {
    return await axios.post(`${BASE_URL}users/register`, { email });
  } catch (error) {
    return NETWORK_ERROR;
  }
};
export const uploadImage = async (formData) => {
  try {
    return await axios({
      method: "post",
      url: `${BASE_URL}users/upload-image`,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
  } catch (error) {
    return NETWORK_ERROR;
  }
};
export const registerProfile = async (data) => {
  try {
    return await axios.post(`${BASE_URL}users/register-profile`, data, config);
  } catch (error) {
    return NETWORK_ERROR;
  }
};

export const updateProfile = async (data) => {
  try {
    return await axios.post(`${BASE_URL}users/profile`, data, config);
  } catch (error) {
    return NETWORK_ERROR;
  }
};
export const updateProfileImage = async (data) => {
  try {
    return await axios.post(
      `${BASE_URL}users//upload-profile-image`,
      data,
      config
    );
  } catch (error) {
    return NETWORK_ERROR;
  }
};
export const updateBrandImage = async (data) => {
  try {
    return await axios.post(
      `${BASE_URL}users/upload-brand-image`,
      data,
      config
    );
  } catch (error) {
    return NETWORK_ERROR;
  }
};

export const addBrand = async (data) => {
  try {
    return await axios.post(`${BASE_URL}users/brand`, data, config);
  } catch (error) {
    return NETWORK_ERROR;
  }
};

export const addChallange = async (data) => {
  try {
    return await axios.post(`${BASE_URL}challenges/create`, data, config);
  } catch (error) {
    return NETWORK_ERROR;
  }
};

export const addTrainer = async (data) => {
  try {
    return await axios.post(`${BASE_URL}trainers/create`, data, config);
  } catch (error) {
    return NETWORK_ERROR;
  }
};

export const updateTrainerImage = async (data) => {
  try {
    return await axios.post(
      `${BASE_URL}users/upload-trainer-image`,
      data,
      config
    );
  } catch (error) {
    return NETWORK_ERROR;
  }
};
export const updateImage = async (data) => {
  try {
    return await axios.post(`${BASE_URL}users/upload-image`, data, config);
  } catch (error) {
    return NETWORK_ERROR;
  }
};
export const updateNotificationSettings = async (data) => {
  try {
    return await axios.post(
      `${BASE_URL}users/notifications-settings`,
      data,
      config
    );
  } catch (error) {
    return NETWORK_ERROR;
  }
};
export const getBrandById = async (userId) => {
  try {
    return await axios.get(
      `${BASE_URL}users/brand/user/${userId}`,

      config
    );
  } catch (error) {
    return NETWORK_ERROR;
  }
};
export const getNotificationSettingsById = async (userId) => {
  try {
    return await axios.get(
      `${BASE_URL}users/notification-settings/${userId}`,

      config
    );
  } catch (error) {
    return NETWORK_ERROR;
  }
};
export const updateLandingPage = async (data) => {
  try {
    return await axios.post(`${BASE_URL}landings/add`, data, config);
  } catch (error) {
    return NETWORK_ERROR;
  }
};
export const getLandingPageById = async (userId) => {
  try {
    return await axios.get(
      `${BASE_URL}landings/user/${userId}`,

      config
    );
  } catch (error) {
    return NETWORK_ERROR;
  }
};
