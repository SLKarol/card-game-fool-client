import type { FC } from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { useRootStore } from "stores/root";
import { useLocalStorage } from "lib/useLocalStorage";
import { useSocket } from "lib/socket";
import BlockHeading from "components/BlockHeading";

const UserInfo: FC = () => {
  const {
    userStore: { name, logout },
  } = useRootStore();
  const history = useHistory();
  const [, setToken] = useLocalStorage("gamerToken");
  const socket = useSocket();

  const onClickLogout = () => {
    logout();
    socket?.disconnect();
    setToken("");
    history.push("/login");
  };
  return (
    <section className="clean-block clean-form dark">
      <Container>
        <BlockHeading>{name}</BlockHeading>
        <Row className="justify-content-center">
          <Col>
            Вы можете{" "}
            <Button variant="link" onClick={onClickLogout}>
              перелогиниться
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default observer(UserInfo);
