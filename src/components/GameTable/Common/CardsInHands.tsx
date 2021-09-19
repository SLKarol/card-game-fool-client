import { FC } from "react";

import styles from "./CardsInHands.module.css";

const CardsInHands: FC = ({ children }) => (
  <div className={styles.cards}>{children}</div>
);

export default CardsInHands;
