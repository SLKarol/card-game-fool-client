import { makeAutoObservable } from "mobx";

import type { RootStore } from "./root";

const ERROR_RESPONSE = "Ошибка запроса данных";

type ErrorMessage = Error | string;

interface ErrorInfo {
  header?: string;
  message: ErrorMessage;
}

export class ErrorStore {
  /**
   * Заголовок ошибки
   */
  header: string;

  /**
   * Текст ошибки
   */
  message: string;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.header = "";
    this.message = "";
  }

  setError = (error: ErrorInfo | string) => {
    if (typeof error === "string") {
      this.header = "";
      this.message = error;
      return;
    }
    const { header = "", message } = error;
    this.header = header;
    if (typeof message === "string") {
      this.message = message;
      return;
    }
    const { name, message: messageError, ...err } = message;
    this.message = `${name} ${messageError}\n${err}`;
  };

  clearError = () => {
    this.header = "";
    this.message = "";
  };

  setAxiosError = (error: any) => {
    if (error.response) {
      this.setError({
        message: error.response.data.message,
        header: ERROR_RESPONSE,
      });
    } else if (error.request) {
      this.setError({
        message: JSON.stringify(error.request),
        header: ERROR_RESPONSE,
      });
    } else {
      this.setError({
        message: error.message,
        header: ERROR_RESPONSE,
      });
    }
  };
}

