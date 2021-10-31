import { useSocket } from "socket.io-react-hook";

export const useAuthenticatedSocket = () => {
  const token = localStorage.getItem("gamerToken");
  return useSocket(process.env.REACT_APP_SOCKET_URL || "", {
    auth: {
      token,
    },
    enabled: !!token,
  });
};
