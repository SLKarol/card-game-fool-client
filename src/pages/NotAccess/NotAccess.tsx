import type { FC } from "react";
import Container from "react-bootstrap/Container";
import clsx from "clsx";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";

const NotAccess: FC = () => (
  <section className={clsx("clean-block", styles.container)}>
    <Container>
      <div className="block-heading">
        <h2 className="text-danger">Необходима авторизация</h2>
        <p>
          Для того, чтобы начать игру, необходимо пройти{" "}
          <Link to="/register">регистрацию</Link> или{" "}
          <Link to="/login">залогниться</Link>, если Вы это уже сделали.
        </p>
      </div>
    </Container>
  </section>
);

export default NotAccess;
