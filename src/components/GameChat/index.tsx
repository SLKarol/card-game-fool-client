import type { FC, SyntheticEvent } from "react";
import { useState } from "react";
import clsx from "clsx";
import { observer } from "mobx-react";

import { useGameStore } from "stores/game";
import { useAuthenticatedSocket } from "lib/useSocket";

import styles from "./index.module.css";
import Control from "./Control";
import ListMessages from "./ListMessages";

const GameChat: FC = () => {
  const [message, setMessage] = useState("");
  const {
    gameId,
    logs: { addMessage },
  } = useGameStore();
  const { socket } = useAuthenticatedSocket();
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    socket.emit("send_message", { gameId, message });
    addMessage("gamer", message);
    setMessage("");
  };
  return (
    <form className={clsx(styles.container, "bg-gradient")} onSubmit={onSubmit}>
      <ListMessages />
      <Control message={message} changeMessage={setMessage} />
    </form>
  );
};

export default observer(GameChat);
