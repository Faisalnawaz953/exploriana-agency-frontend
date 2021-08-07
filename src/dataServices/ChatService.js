import axios from 'axios'
import { BASE_URL } from '../Constants/Constants'
export const getAllChatRoomsByUserId = async uid => {
  try {
    const res = await axios.get(`${BASE_URL}chat/user/${uid}`)
    return res.data
  } catch (error) {
    return error
  }
}
export const createChatRoom = async participants => {
  try {
    const res = await axios.post(`${BASE_URL}chat/create-room`, {
      participants
    })
    return res.data
  } catch (error) {
    return error
  }
}
export const sendMessageInChatRoom = async (roomId, text, senderId) => {
  try {
    const res = await axios.post(`${BASE_URL}chat/send-message/${roomId}`, {
      text,
      senderId
    })
    return res.data
  } catch (error) {
    return error
  }
}
export const readAllUnseenMessages = async roomId => {
  try {
    const res = await axios.post(`${BASE_URL}chat/seen-all-messages/${roomId}`)
    return res.data
  } catch (error) {
    return error
  }
}
