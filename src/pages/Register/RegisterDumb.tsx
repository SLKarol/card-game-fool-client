import type { ChangeEventHandler, FC, FormEvent } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import BlockHeading from "../../components/BlockHeading";

interface Props {
  username: string;
  email: string;
  password: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  busy: boolean;
  errorMessage: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const RegisterDumb: FC<Props> = ({
  username,
  busy,
  errorMessage,
  email,
  onChange,
  password,
  onSubmit,
}) => {
  return (
    <section className="clean-block clean-form dark">
      <Container>
        <BlockHeading>Регистрация</BlockHeading>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Имя пользователя</Form.Label>
            <Form.Control
              className="item"
              required
              value={username}
              onChange={onChange}
              disabled={busy}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Почта</Form.Label>
            <Form.Control
              type="email"
              className="item"
              required
              value={email}
              onChange={onChange}
              disabled={busy}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              className="item"
              required
              value={password}
              onChange={onChange}
              disabled={busy}
            />
          </Form.Group>
          <div className="mb-3"></div>
          <Button variant="primary" type="submit" disabled={busy}>
            Войти
          </Button>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Alert variant="light">
            Нет пароля? -{" "}
            <Alert.Link as={Link} className="forgot" to="/register">
              Зарегестрироваться.
            </Alert.Link>
          </Alert>
        </Form>
      </Container>
    </section>
  );
};

export default RegisterDumb;
