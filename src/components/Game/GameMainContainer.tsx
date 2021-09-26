import type { FC } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { flowResult } from "mobx";
import { observer } from "mobx-react";
import clsx from "clsx";

import { useGameStore } from "stores/game";
import { useRootStore } from "stores/root";
import TrumpSuit from "./Stuff/TrumpSuit";
import WhoseTurn from "./Stuff/WhoseTurn";
import Deck from "components/Deck";
import GameTable from "components/GameTable";
import GameChat from "components/GameChat";

import styles from "./GameMainContainer.module.css";

const GameMainContainer: FC = () => {
  const {
    game: {
      fetchGameSetting,
      gameId,
      logs: { parseMessage },
      gameTable: { writeTableInfo },
    },
  } = useGameStore();
  const {
    errorStore: { setAxiosError },
    socketStore: { socket },
  } = useRootStore();

  let history = useHistory();

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

  // Отправить сообщение в чат, что игрок вошёл в игру
  useEffect(() => {
    socket.emit("join_game", { gameId });
    // И отправить сообщение, что вышел из игры
    return () => {
      socket.emit("leave_game", { gameId });
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("chat", parseMessage);
      socket.on("table", writeTableInfo);
    }
    return () => {
      if (socket) {
        socket.off("chat", parseMessage);
        socket.off("table", writeTableInfo);
      }
    };
  }, []);

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
