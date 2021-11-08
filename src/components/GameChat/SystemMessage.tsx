import { FC } from "react";

import DateTime from "./DateTime";

import styles from "./SystemMessage.module.css";

interface Props {
  dateTime: string;
  message: string;
}

const SystemMessage: FC<Props> = ({ dateTime, message }) => {
  return (
    <div className={styles.systemMsg}>
      <div className={styles.systemContent}>{message}</div>
      <DateTime dateTime={dateTime} />
    </div>
  );
};

export default SystemMessage;
