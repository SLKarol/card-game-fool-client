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
  const { game } = useGameStore();
  const {
    errorStore: { setAxiosError },
    socketStore: { socket },
  } = useRootStore();

  let history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        await flowResult(game.fetchGameSetting());
      } catch (err) {
        setAxiosError(err);
        history.push("/error");
      }
    })();
  }, []);

  useEffect(() => {
    socket.emit("join_chat", { gameId: game.gameId });
  }, []);

  useEffect(() => {
    let testFunstion: any;
    if (socket) {
      testFunstion = (e: any) => {
        console.log("testFunstion :>> ", e);
      };
      socket.on("chat", testFunstion);
    }
    return () => {
      socket && socket.off("chat", testFunstion);
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
