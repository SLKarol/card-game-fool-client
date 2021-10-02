import type { AxiosResponse } from "axios";
import { makeAutoObservable, flow } from "mobx";

import type { RootStore } from "./root";

import { UserResponse } from "types/user";
import type { ApiError } from "lib/parseError";

import axios, { getHeaderAuthToken } from "lib/axios";
import { parseApiError } from "lib/parseError";

export class UserStore {
  /**
   * Имя пользователя
   */
  name: string = "";

  /**
   * Ошибки при запросе
   */
  fetchError: string = "";

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /**
   * Первоначальная загрузка инфы о юзере
   */
  fetchUserInfo = flow(function* (this: UserStore) {
    const token = localStorage.getItem("gamerToken");
    if (token) {
      try {
        const response = yield axios.get("/user", {
          headers: getHeaderAuthToken(),
        }) as unknown;
        this.name = (
          response as AxiosResponse<UserResponse>
        ).data.user.username;
      } catch (error) {
        this.fetchError = "error";
      }
    }
  });

  *userLogin(email: string, password: string): Generator {
    try {
      const response = yield axios.post<
        { user: { email: string; password: string } },
        UserResponse
      >("users/login", {
        user: { email, password },
      });
      const { username, token } = (response as AxiosResponse<UserResponse>).data
        .user;
      localStorage.setItem("gamerToken", token);
      this.name = username;
      this.rootStore.socketStore.connect();
    } catch (error) {
      const { message, response } = error as any;
      if (response) {
        const { data }: { data: ApiError } = response;
        this.fetchError = parseApiError(data);
        return;
      }
      this.fetchError = message;
    }
  }

  logout = () => {
    localStorage.removeItem("gamerToken");
    this.name = "";
    this.rootStore.socketStore.socket.disconnect();
  };
}
