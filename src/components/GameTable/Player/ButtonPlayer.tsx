import { FC } from "react";
import Button from "react-bootstrap/Button";
import { flowResult } from "mobx";
import { observer } from "mobx-react";

import { useGameStore } from "stores/game";
import styles from "./ButtonPlayer.module.css";

const ButtonPlayer: FC = () => {
  const { opponentWhoseTurn, disabledButton, finishTurn } = useGameStore();
  const myTurn = !!opponentWhoseTurn();
  const onClick = async () => await flowResult(finishTurn());

  return (
    <div className={styles.div}>
      <Button
        variant={!!myTurn ? "danger" : "primary"}
        disabled={disabledButton}
        onClick={onClick}
      >
        {!!myTurn ? "Беру" : "Ход закончен"}
      </Button>
    </div>
  );
};

export default observer(ButtonPlayer);
