import { FC } from "react";
import { observer } from "mobx-react";
import ModalBody from "react-bootstrap/ModalBody";
import ListGroup from "react-bootstrap/ListGroup";

import { useGameStore } from "stores/game";

const ResultBody: FC = () => {
  const { busy, scores } = useGameStore();
  return (
    <ModalBody>
      Игра окончена и вот список победителей:
      {busy ? (
        <strong>Загрузка...</strong>
      ) : (
        <ListGroup variant="flush">
          {scores.map((s) => (
            <ListGroup.Item key={s}>{s}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </ModalBody>
  );
};

export default observer(ResultBody);
