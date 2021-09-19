import { FC } from "react";
import Badge from "react-bootstrap/Badge";
import { observer } from "mobx-react";
import clsx from "clsx";

import { useGameStore } from "stores/game";
import styles from "./Count.module.css";

const CountCards: FC = () => {
  const {
    game: { countCards },
  } = useGameStore();
  return (
    <h5 className={clsx(styles.count, countCards <= 1 && styles.cards1)}>
      <Badge pill bg="info">
        {countCards}
      </Badge>
    </h5>
  );
};

export default observer(CountCards);
