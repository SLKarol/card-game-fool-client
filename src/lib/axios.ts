import axios from "axios";
const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
export default instance;

export const getHeaderAuthToken = () => {
  const token = localStorage.getItem("gamerToken");
  return { Authorization: `Bearer ${token}` };
};

/**
 * Парсинг ответа axios об ошибке
 */
export const getAxiosErrorMessage = (error: any) => {
  if (error.response) {
    const { data } = error.response;
    if (Array.isArray(data)) {
      return data.join(";");
    }
    if (typeof data === "object" && "message" in data) {
      return data.message;
    }
    return JSON.stringify(data);
  } else if (error.request) {
    return JSON.stringify(error.request);
  } else {
    return error.message as string;
  }
};
