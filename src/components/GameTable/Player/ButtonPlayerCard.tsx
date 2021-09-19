import { FC } from "react";
import { observer } from "mobx-react";

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

  return (
    <button
      type="button"
      key={id}
      className={styles.card}
      data-card-id={id}
      onClick={onClickCard}
      disabled={gameBusy}
    >
      <CardFront id={id} />
    </button>
  );
};

export default observer(ButtonPlayerCard);
