import { FC } from "react";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react";

import { useGameStore } from "stores/game";
import styles from "./ButtonPlayer.module.css";

const ButtonPlayer: FC = () => {
  const { opponentWhoseTurn, disabledButton } = useGameStore();
  const myTurn = !!opponentWhoseTurn();

  return (
    <div className={styles.div}>
      <Button
        variant={!!myTurn ? "danger" : "primary"}
        disabled={disabledButton}
      >
        {!!myTurn ? "Беру" : "Ход закончен"}
      </Button>
    </div>
  );
};

export default observer(ButtonPlayer);
