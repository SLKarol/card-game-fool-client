import { useRef, useContext } from "react";
import { io } from "socket.io-client";
import type { Socket, SocketOptions } from "socket.io-client";

import type { SocketContextInterface } from "./socket.types";
import SocketContext from "./SocketContext";

export function useSocket(options?: SocketOptions) {
  const { getStatus } = useContext<SocketContextInterface>(SocketContext);
  const status = getStatus();
}
