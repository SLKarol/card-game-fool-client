import { FC } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ReactComponent as Telegram } from "img/telegram.svg";

import styles from "./Control.module.css";

const Control: FC = () => (
  <div className={styles.control}>
    <Form.Control size="sm" type="text" placeholder="Введите сообщение" />
    <Button variant="success">
      <Telegram />
    </Button>
  </div>
);

export default Control;
