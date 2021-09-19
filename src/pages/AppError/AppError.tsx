import type { FC } from "react";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import clsx from "clsx";
import { observer } from "mobx-react";

import { useRootStore } from "stores/root";
import styles from "./styles.module.css";
import BlockHeading from "components/BlockHeading";

const AppError: FC = () => {
  const {
    errorStore: { header, message, clearError },
  } = useRootStore();
  useEffect(() => {
    return () => {
      clearError();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className={clsx("clean-block", styles.container)}>
      <Container>
        <BlockHeading textClassName="text-danger">
          Во время работы возникла ошибка
        </BlockHeading>
        <Row className="justify-content-center">
          <Col>
            <div className="clean-pricing-item">
              <div className="heading">
                <h3>{header || "Ошибка"}</h3>
              </div>
              <p>{message}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default observer(AppError);
