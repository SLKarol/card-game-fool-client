import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useLocalStorage } from "./useLocalStorage";

export const useSocket = () => {
  const [token] = useLocalStorage("gamerToken");

  const socketRef = useRef<null | Socket>(
    token
      ? io(process.env.REACT_APP_SOCKET_URL || "", {
          extraHeaders: { Authorization: `Bearer ${token}` },
        })
      : null
  );

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_SOCKET_URL || "", {
      extraHeaders: { Authorization: `Bearer ${token}` },
    });
  }, [token]);
  return socketRef.current;
};
