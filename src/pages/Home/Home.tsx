import type { FC } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BlockHeading from "components/BlockHeading";

const Home: FC = () => (
  <section className="clean-block features">
    <Container>
      <BlockHeading>Home</BlockHeading>
      <Row>
        <Col>
          <p className="lead">
            Зарегестрированные люди могут играть друг с другом в подкидного
            дурака. Во время игры доступен игровой чат.
          </p>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Home;
