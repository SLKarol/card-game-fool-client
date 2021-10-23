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

  setName = (name: string) => {
    this.name = name;
  };

  setFetchError = (error: any) => {
    const { message, response } = error;
    if (response) {
      const { data }: { data: ApiError } = response;
      this.fetchError = parseApiError(data);
      return;
    }
    this.fetchError = message;
  };

  logout = () => {
    this.name = "";
  };
}
