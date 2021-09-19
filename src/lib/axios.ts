import axios from "axios";
const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
export default instance;

export const getHeaderAuthToken = () => {
  const token = localStorage.getItem("gamerToken");
  return { Authorization: `Bearer ${token}` };
};
