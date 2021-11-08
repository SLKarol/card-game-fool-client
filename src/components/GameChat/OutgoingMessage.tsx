import { FC } from "react";

import DateTime from "./DateTime";

import styles from "./OutgoingMessage.module.css";

interface Props {
  dateTime: string;
  message: string;
}

const OutgoingMessage: FC<Props> = ({ dateTime, message }) => {
  return (
    <div className={styles.outgoingMsg}>
      <div className={styles.sentMsg}>
        <div>{message}</div>
        <DateTime dateTime={dateTime} />
      </div>
    </div>
  );
};

export default OutgoingMessage;
