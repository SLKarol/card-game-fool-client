import type { FC } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BlockHeading from "components/BlockHeading";

const About: FC = () => (
  <section className="clean-block features">
    <Container>
      <BlockHeading>О программе</BlockHeading>
      <Row>
        <Col>
          <p>
            Игра написана неспешно, по время выходным, когда есть время и
            желание написать что-нибудь не относящееся к работе.
          </p>
          <p>
            Во время регистрации необходимо ввести электронный адрес. Сейчас
            можно вводить любой адрес, даже несуществующий, но где-то в
            отдалённых планах сделать рассылку игроку, когда его приглашают на
            поедиенок. Так что какую почту вводить- решать Вам.
          </p>
        </Col>
      </Row>
    </Container>
  </section>
);

export default About;
