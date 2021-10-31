import type { Socket } from "socket.io-client";

export type Status = "connecting" | "connected" | "disconnected";

export interface SocketContextInterface {
  getStatus: () => Status;
}
