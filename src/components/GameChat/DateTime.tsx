import { FC } from "react";

import styles from "./DateTime.module.css";
import { formatFromISO } from "lib/dateTime";

interface Props {
  dateTime: string;
}

const DateTime: FC<Props> = ({ dateTime }) => (
  <span className={styles.dateTime}>{formatFromISO(dateTime)}</span>
);

export default DateTime;
