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

export const updateProfile = async (data) => {
  try {
    return await axios.post(`${BASE_URL}users/profile`, data, config);
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
