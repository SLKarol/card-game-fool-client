import { createContext } from "react";

import { SocketContextInterface } from "./socket.types";

const SocketContext = createContext<SocketContextInterface>({
  getStatus: () => "disconnected",
});

export default SocketContext;
