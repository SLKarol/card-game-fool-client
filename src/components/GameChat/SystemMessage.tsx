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
      <p className={styles.systemContent}>{message}</p>
      <DateTime dateTime={dateTime} system />
    </div>
  );
};

export default SystemMessage;
