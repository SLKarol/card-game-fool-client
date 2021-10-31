import { useRef, useState } from "react";
import io from "socket.io-client";
import type { Socket } from "socket.io-client";

import { Status } from "./socket.types";
import SocketContext from "./SocketContext";

const SocketProvider = function ({ children }: React.PropsWithChildren<{}>) {
  let socket = useRef<Socket>();
  const [status, setStatus] = useState<Status>("disconnected");

  const getStatus = () => status;

  const createConnection = (url: string, options = {}) => {
    const cleanup = () => socket.current?.disconnect();

    // if (socket.current) {
    //   sockets.current[namespaceKey].connect();
    //   return { socket: sockets.current[namespaceKey], cleanup };
    // }
    // const handleConnect = () =>
    //   setStatuses((state) => ({ ...state, [namespaceKey]: "connected" }));

    // const handleDisconnect = () =>
    //   setStatuses((state) => ({ ...state, [namespaceKey]: "disconnected" }));

    // const socket = io(urlConfig.source, options) as SocketLikeWithNamespace;
    // socket.namespaceKey = namespaceKey;

    // sockets.current = Object.assign({}, sockets.current, {
    //   [namespaceKey]: socket,
    // });
    // socket.on("error", (error) => setError(namespaceKey, error));
    // socket.on("connect", handleConnect);
    // socket.on("disconnect", handleDisconnect);
    // return { socket, cleanup };
  };

  return (
    <SocketContext.Provider value={{ getStatus }}></SocketContext.Provider>
  );
};

export default SocketProvider;
