import { FC } from "react";
import { observer } from "mobx-react";
import clsx from "clsx";

import { useGameStore } from "stores/game";
import CardFront from "components/Card/CardFront";

import styles from "./TrumpCard.module.css";

const TumpCard: FC = () => {
  const {
    trumpCard: { idCard },
    countCards,
  } = useGameStore();
  return (
    <CardFront
      id={idCard}
      className={clsx(styles.card, countCards === 0 && styles.cards0)}
    />
  );
};

export default observer(TumpCard);
