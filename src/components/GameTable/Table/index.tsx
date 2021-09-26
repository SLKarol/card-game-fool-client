import { FC } from "react";
import { observer } from "mobx-react";

import { useGameStore } from "stores/game";

import styles from "./index.module.css";
import GameTableLayout from "./GameTableLayout";

const TableContainer: FC = () => {
  const {
    game: {
      gameTable: { busy },
    },
  } = useGameStore();

  return (
    <div className={styles.container}>{busy ? null : <GameTableLayout />}</div>
  );
};

export default observer(TableContainer);
