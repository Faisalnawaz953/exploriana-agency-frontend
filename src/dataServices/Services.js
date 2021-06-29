import axios from "axios";
import { BASE_URL, NETWORK_ERROR } from "../Constants/Constants";

export const auth = async (email) => {
  try {
    return await axios.post(`${BASE_URL}users/login`, { email });
  } catch (err) {
    return NETWORK_ERROR;
  }
};
