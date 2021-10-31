import io, { Socket } from "socket.io-client";

let socket: Socket;

/**
 * Инициализация токена
 */
export const initiateSocket = () => {
  const token = localStorage.getItem("gamerToken");
  if (token) {
    console.log(`Подключаюсь к сокету...`);
    socket = io(process.env.REACT_APP_SOCKET_URL || "", {
      extraHeaders: { Authorization: `Bearer ${token}` },
    });
  }
};
/**
 * Подключение к чату игры
 * @param {string} gameId Id игры
 */
export const joinGameChat = (gameId: string) => {
  if (socket && gameId) {
    socket.emit("join_game", { gameId });
  }
};

export const leaveGameChat = (gameId: string) => {
  if (socket && gameId) {
    socket.emit("leave_game", { gameId });
  }
};

/**
 * Отключиться от сокета
 */
export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) {
    socket.disconnect();
  }
};

export const subscribeToEvent = (event: string, callback: Function) => {
  if (!socket) return;
  socket.on(event, (msg) => {
    return callback(msg);
  });
};

export const unSubscribeEvent = (
  event: string,
  callback: (...args: any[]) => void
) => {
  if (!socket) return;
  socket.off(event, callback);
};

export const sendMessage = (room: string, message: string) => {
  if (socket) socket.emit("chat", { message, room });
};
