import { FC, useEffect, useRef } from "react";
import { observer } from "mobx-react";

import { useGameStore } from "stores/game";
import styles from "./ListMessages.module.css";
import ReceiveMessage from "./ReceiveMessage";
import OutgoingMessage from "./OutgoingMessage";
import SystemMessage from "./SystemMessage";

const ListMessages: FC = () => {
  const messageEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Обработчик появления новой строки в списке логов
    function handler(event: any) {
      const { currentTarget: target } = event;
      // опустить указатель скролла вниз
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    }
    // Убрать обработчик скролла
    function cleanup() {
      if (messageEl.current !== null) {
        messageEl.current.removeEventListener("DOMNodeInserted", handler);
      }
    }
    if (messageEl && messageEl.current !== null) {
      messageEl.current.addEventListener("DOMNodeInserted", handler);
    }
    return cleanup;
  }, []);
  const {
    logs: { logs },
  } = useGameStore();

  return (
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
  );
};

export default observer(ListMessages);
