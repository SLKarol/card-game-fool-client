import { useHistory } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

/**
 * Переводит неавторизованного пользователя на страницу авторизации
 */
export function useGuardOnToken() {
  const history = useHistory();
  const [token] = useLocalStorage("gamerToken");
  if (!token) {
    history.push("/not-access");
    return null;
  }
}
