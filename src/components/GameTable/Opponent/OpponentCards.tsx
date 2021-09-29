import { FC } from "react";
import { observer } from "mobx-react";

import styles from "./OpponentCards.module.css";
import { useGameStore } from "stores/game";
import CardBack from "components/Card/CardBack";
import CardsInHands from "../Common/CardsInHands";

const OpponentCards: FC = () => {
  const {
    opponent: { countCards },
  } = useGameStore();

  return (
    <CardsInHands>
      {Array.from({ length: countCards }, (v, k) => (
        <CardBack className={styles.back} key={k} />
      ))}
    </CardsInHands>
  );
};

export default observer(OpponentCards);
