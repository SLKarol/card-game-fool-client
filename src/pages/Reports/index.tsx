import type { FC } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import BlockHeading from "components/BlockHeading";
import MyGames from "components/Reports/MyGames";

const Reports: FC = () => {
  return (
    <section className="clean-block features">
      <Container>
        <BlockHeading>Статистика</BlockHeading>
        <Row>
          <Col>
            <MyGames />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Reports;
