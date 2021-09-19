import { FC } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

import { OpenGameDto } from "types/game";
import CreatedAgo from "./CreatedAgo";
import OpenGameCreatedAt from "./OpenGameCreatedAt";

// todo подстветить те игры, где онлайн противники
const OpenGame: FC<OpenGameDto> = ({ createdAt, idGame, nameUser }) => {
  const now = new Date();
  return (
    <ListGroup.Item as={Link} to={`/game/${idGame}`}>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{`Оппонент: ${nameUser}`}</h5>
        <CreatedAgo now={now} value={createdAt} />
      </div>
      <OpenGameCreatedAt value={createdAt} />
    </ListGroup.Item>
  );
};

export default OpenGame;
