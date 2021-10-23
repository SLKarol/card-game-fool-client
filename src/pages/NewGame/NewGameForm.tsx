import type { FC, FormEvent } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import GetOpponents from "components/NewGame/GetOpponents";

interface Props {
  onSubmit: (o: string) => void;
  error: string;
  busy: boolean;
}

const NewGameDumb: FC<Props> = ({ onSubmit, error, busy }) => {
  const [selectedOpponent, setSelectedOpponent] = useState<string>("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(selectedOpponent);
  };

  return (
    <>
      <section className="contact-clean"></section>
      <section className="register-photo">
        <div className="form-container">
          <div className="image-holder"></div>
          <Form onSubmit={handleSubmit}>
            <h2 className="text-center">
              Создать <strong>новую</strong> игру.
            </h2>
            <div className="mb-3">
              <GetOpponents
                value={selectedOpponent}
                onChange={setSelectedOpponent}
              />
            </div>
            <div className="mb-3">
              <Button
                className="d-block w-100"
                type="submit"
                variant="primary"
                disabled={!selectedOpponent || busy}
              >
                Создать
              </Button>
            </div>
            <div className="summary">
              Будет создана игра с выбранным оппонентом
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
          </Form>
        </div>
      </section>
    </>
  );
};

export default NewGameDumb;
