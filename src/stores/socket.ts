import { makeAutoObservable } from "mobx";

import { io, Socket } from "socket.io-client";

import type { RootStore } from "./root";

export class SocketStore {
  socket: Socket;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.socket = this.getSocket();
  }

  connect = () => {
    this.socket = this.getSocket();
  };

  /**
   * Функция, возвращающая сокет.
   * Если юзер не авторизован, значит будет без чата
   */
  private getSocket = () => {
    const token = localStorage.getItem("gamerToken") || "";
    return io(process.env.REACT_APP_SOCKET_URL || "", {
      extraHeaders: { Authorization: `Bearer ${token}` },
    });
  };
}
