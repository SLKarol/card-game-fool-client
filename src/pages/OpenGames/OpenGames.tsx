import type { FC } from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

import { OpenGameDto } from "types/game";
import axios from "lib/axios";
import { useGuardOnToken } from "lib/hook";

import BlockHeading from "components/BlockHeading";
import OpenGame from "components/OpenGame/OpenGame";

import styles from "./styles.module.css";

const OpenGames: FC = () => {
  // const history = useHistory();
  const [games, setGames] = useState<OpenGameDto[]>([]);
  useGuardOnToken();

  useEffect(() => {
    const token = localStorage.getItem("gamerToken");
    axios
      .get<{ games: OpenGameDto[] }>("game/open", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { games } = response.data;
        setGames(games);
      });
  }, []);

  return (
    <section className="clean-block features">
      <Container>
        <BlockHeading>
          Список зарегистрированных игр, в которых Вы можете принять участие
        </BlockHeading>
        <Row>
          <Col>
            <ListGroup className={styles.listGroup}>
              {games.map((g) => (
                <OpenGame key={g.idGame} {...g} />
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OpenGames;
