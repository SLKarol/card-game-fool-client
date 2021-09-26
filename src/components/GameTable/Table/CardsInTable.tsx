import { FC } from "react";

import CardFront from "components/Card/CardFront";
import styles from "./CardsInTable.module.css";

interface Props {
  attack: number;
  defence?: number;
}

const CardsInTable: FC<Props> = ({ attack, defence }) => (
  <div className={styles.cards}>
    <CardFront id={attack} className="gameCard__table" />
    {defence && (
      <CardFront
        id={defence}
        className="gameCard__table gameCard__table--defence"
      />
    )}
  </div>
);

export default CardsInTable;
