import { FC } from "react";

import DateTime from "./DateTime";

import styles from "./ReceiveMessage.module.css";

interface Props {
  dateTime: string;
  message: string;
}

const ReceiveMessage: FC<Props> = ({ dateTime, message }) => {
  return (
    <div className={styles.receivedMsg}>
      <div className={styles.receivedWithdMsg}>
        <p className={styles.receivedMsgContent}>{message}</p>
        <DateTime dateTime={dateTime} />
      </div>
    </div>
  );
};

export default ReceiveMessage;
