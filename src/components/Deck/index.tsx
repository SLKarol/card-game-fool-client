import type { FC } from "react";

import CountCards from "./CountCards";
import TumpCard from "./TumpCard";
import DeckOfCards from "./DeckOfCards";

import styles from "./index.module.css";

const Deck: FC = () => (
  <div className={styles.deck}>
    <TumpCard />
    <DeckOfCards />
    <CountCards />
  </div>
);

export default Deck;
