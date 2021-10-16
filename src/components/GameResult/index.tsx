import { FC, MouseEvent } from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";

import { useGameStore } from "stores/game";
import ResultBody from "./ResultBody";

const GameResult: FC = () => {
  const history = useHistory();
  const { gameOpen } = useGameStore();
  if (gameOpen) return null;

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const href = e.currentTarget.getAttribute("data-href") || "/";
    history.push(href);
  };
  return (
    <Modal show={true} backdrop="static" keyboard={false} size="lg" centered>
      <ModalHeader closeButton={false}>
        <ModalTitle>Игра окончена</ModalTitle>
      </ModalHeader>
      <ResultBody />
      <ModalFooter>
        <Button variant="secondary" onClick={onClick} data-href="/">
          На главную
        </Button>
        <Button variant="info" onClick={onClick} data-href="/reports">
          Cтатистика
        </Button>
        <Button variant="primary" onClick={onClick} data-href="/start">
          Начать новую игру
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default observer(GameResult);
