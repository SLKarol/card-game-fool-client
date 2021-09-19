//! Вероятно удалить

import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";

/**
 * Контекст для сокета
 */
export const SocketContext = createContext<Socket | undefined>(undefined);

/**
 * Хук, отдающий сокет
 */
export const useSocket = () => useContext(SocketContext);

/**
 * Функция, возвращающая сокет.
 * Если юзер не авторизован, значит будет без чата
 */
export const getSocket = () => {
  const token = localStorage.getItem("gamerToken");
  if (token) {
    console.log('process.env.REACT_APP_SOCKET_URL :>> ', process.env.REACT_APP_SOCKET_URL);
    return io(process.env.REACT_APP_SOCKET_URL || "", {
      extraHeaders: { Authorization: `Bearer ${token}` },
    });
  }
  return undefined;
};