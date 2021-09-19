import type { FC } from "react";
import { observer } from "mobx-react";

import { useGameStore } from "stores/game";
import { useRootStore } from "stores/root";

import styles from "./WhoseTurn.module.css";

const WhoseTurn: FC = () => {
  const {
    game: { opponentWhoseTurn },
  } = useGameStore();
  const {
    userStore: { name },
  } = useRootStore();
  const turnOpponent = opponentWhoseTurn();
  return (
    <>
      <span>Сейчас ходит:</span>
      <span className={styles.info}>{turnOpponent || name}</span>
    </>
  );
};

export default observer(WhoseTurn);
