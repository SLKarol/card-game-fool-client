import type { FC } from "react";

import styles from "./MyGamesNumber.module.css";

interface Props {
  count: number | null;
}

const MyGamesNumber: FC<Props> = ({ count }) => (
  <mark className={styles.count}>
    {count === null ? "Не определено" : count}
  </mark>
);

export default MyGamesNumber;
