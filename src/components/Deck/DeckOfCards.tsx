import { FC } from "react";
import { observer } from "mobx-react";
import clsx from "clsx";

import { useGameStore } from "stores/game";
import CardBack from "components/Card/CardBack";

import styles from "./DeckOfCards.module.css";

const DeckOfCards: FC = () => {
  const { countCards } = useGameStore();

  if (countCards < 2) return null;
  let className = "";
  if (countCards <= 3) className = clsx(styles.back, styles.back3);
  if (countCards > 3 && countCards <= 10)
    className = clsx(styles.back, styles.back10);
  if (countCards > 10 && countCards <= 15)
    className = clsx(styles.back, styles.back15);
  if (countCards > 15 && countCards <= 20)
    className = clsx(styles.back, styles.back15);
  if (countCards > 20) className = clsx(styles.back, styles.back24);

  return <CardBack className={className} />;
};

export default observer(DeckOfCards);
