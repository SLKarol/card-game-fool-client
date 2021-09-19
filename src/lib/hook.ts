import { useHistory } from "react-router-dom";

/**
 * Переводит неавторизованного пользователя на страницу авторизации
 */
export function useGuardOnToken() {
  const history = useHistory();
  const token = localStorage.getItem("gamerToken");
  if (!token) {
    history.push("/not-access");
    return null;
  }
}