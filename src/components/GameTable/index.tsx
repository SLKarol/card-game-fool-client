import { FC, useEffect } from "react";
import { flowResult } from "mobx";
import { observer } from "mobx-react";

import { useGameStore } from "stores/game";
import Opponent from "./Opponent";
import Player from "./Player";
import styles from "./index.module.css";
import TableContainer from "./Table";

const GameTable: FC = () => {
  const { gameTable } = useGameStore();

  useEffect(() => {
    (async () => {
      await flowResult(gameTable.getContent());
    })();
  }, []);

  return (
    <div className={styles.component}>
      <Opponent />
      <TableContainer />
      <Player />
    </div>
  );
};

export default observer(GameTable);
