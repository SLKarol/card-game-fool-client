import { FC, useEffect, useRef } from "react";
import clsx from "clsx";
import { observer } from "mobx-react";

import { useGameStore } from "stores/game";
import styles from "./index.module.css";
import ReceiveMessage from "./ReceiveMessage";
import OutgoingMessage from "./OutgoingMessage";
import SystemMessage from "./SystemMessage";
import Control from "./Control";

const GameChat: FC = () => {
  const messageEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messageEl && messageEl.current !== null) {
      messageEl.current.addEventListener("DOMNodeInserted", (event: any) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);
  const {
    game: {
      logs: { logs },
    },
  } = useGameStore();

  return (
    <div className={clsx(styles.container, "bg-gradient")}>
      <div className={styles.history} ref={messageEl}>
        {Array.from(logs.keys()).map((key) => {
          const log = logs.get(key);
          if (log?.typeMessage === "system") {
            return (
              <SystemMessage key={key} message={log.message} dateTime={key} />
            );
          }
          if (log?.typeMessage === "gamer") {
            return (
              <OutgoingMessage key={key} message={log.message} dateTime={key} />
            );
          }
          if (log?.typeMessage === "opponent") {
            return (
              <ReceiveMessage key={key} message={log.message} dateTime={key} />
            );
          }
          return null;
        })}
      </div>
      <Control />
    </div>
  );
};

export default observer(GameChat);
