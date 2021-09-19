import { FC } from "react";
import clsx from "clsx";

import styles from "./DateTime.module.css";
import { formatFromISO } from "lib/dateTime";

interface Props {
  dateTime: string;
  system?: boolean;
}

const DateTime: FC<Props> = ({ dateTime, system }) => (
  <span className={clsx(styles.dateTime, system && styles.system)}>
    {formatFromISO(dateTime)}
  </span>
);

export default DateTime;
