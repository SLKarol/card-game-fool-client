import { FC } from "react";
import clsx from "clsx";

import styles from "./PlayerName.module.css";

interface Props {
  opponent: boolean;
  name: string;
}

const PlayerName: FC<Props> = ({ opponent, name }) => (
  <h5 className={clsx(styles.name, opponent ? styles.opponent : styles.player)}>
    {name}
  </h5>
);

export default PlayerName;
