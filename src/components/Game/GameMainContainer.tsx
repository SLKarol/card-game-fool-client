import type { FC } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { flowResult } from "mobx";
import { observer } from "mobx-react";
import clsx from "clsx";

import { useGameStore } from "stores/game";
import { useRootStore } from "stores/root";

import { useAuthenticatedSocket } from "lib/useSocket";
import TrumpSuit from "./Stuff/TrumpSuit";
import WhoseTurn from "./Stuff/WhoseTurn";
import Deck from "components/Deck";
import GameTable from "components/GameTable";
import GameChat from "components/GameChat";

import styles from "./GameMainContainer.module.css";

const GameMainContainer: FC = () => {
  const {
    fetchGameSetting,
    gameId,
    nextStateGame,
    logs: { parseMessage },
    gameTable: { writeTableInfo },
  } = useGameStore();
  const {
    errorStore: { setAxiosError },
  } = useRootStore();
  let history = useHistory();
  const { socket, connected } = useAuthenticatedSocket();

  useEffect(() => {
    (async () => {
      try {
        await flowResult(fetchGameSetting());
      } catch (err) {
        setAxiosError(err);
        history.push("/error");
      }
    })();
  }, []);

  useEffect(() => {
    // Отправить сообщение в чат, что игрок вошёл в игру
    if (connected) {
      socket.emit("join_game", { gameId });
      // Подписаться на сообщения чата
      socket.on("chat", parseMessage);
      socket.on("table", writeTableInfo);
      socket.on("game", nextStateGame);
    }
    return () => {
      // И отправить сообщение, что вышел из игры
      socket.emit("leave_game", { gameId });
      socket.off("chat", parseMessage);
      socket.off("table", writeTableInfo);
      socket.off("game", nextStateGame);
    };
  }, [connected]);

  if (!connected) return <div>Not connected to socket</div>;
  return (
    <section className={clsx(styles.container)}>
      <div className={styles.gameTable}>
        <header className={styles.header}>
          <h3 className="text-white">
            <TrumpSuit />
            <WhoseTurn />
          </h3>
        </header>
        <aside className={styles.desk}>
          <Deck />
        </aside>
        <article className={styles.table}>
          <GameTable />
        </article>
        <aside className={styles.chat}>
          <GameChat />
        </aside>
      </div>
    </section>
  );
};

export default observer(GameMainContainer);
