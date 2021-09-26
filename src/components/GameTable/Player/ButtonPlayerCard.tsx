import { FC, MouseEvent } from "react";
import { observer } from "mobx-react";
import { flowResult } from "mobx";

import CardFront from "components/Card/CardFront";
import { useGameStore } from "stores/game";
import styles from "./ButtonPlayerCard.module.css";

interface Props {
  id: number;
}

const ButtonPlayerCard: FC<Props> = ({ id }) => {
  const {
    game: { onClickCard, gameBusy },
  } = useGameStore();
  const onClick = async (e: MouseEvent<HTMLButtonElement>) => {
    await flowResult(onClickCard(e));
  };

  // const { game } = useGameStore();
  // const onClick = async (e: any) => {
  //   await flowResult(game.onClickCard(e));
  // };

  return (
    <button
      type="button"
      key={id}
      className={styles.card}
      data-card-id={id}
      onClick={onClick}
      disabled={gameBusy}
    >
      <CardFront id={id} />
    </button>
  );
};

export default observer(ButtonPlayerCard);
