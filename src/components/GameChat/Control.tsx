import type { FC, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ReactComponent as Telegram } from "img/telegram.svg";

import styles from "./Control.module.css";

type Props = {
  message: string;
  changeMessage: (m: string) => void;
};

const Control: FC<Props> = ({ changeMessage, message }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeMessage(e.currentTarget.value);
  };
  return (
    <div className={styles.control}>
      <Form.Control
        size="sm"
        type="text"
        placeholder="Введите сообщение"
        value={message}
        onChange={onChange}
      />
      <Button variant="success" type="submit">
        <Telegram />
      </Button>
    </div>
  );
};
export default Control;
