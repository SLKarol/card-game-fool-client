import type { FC, FormEvent } from "react";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

import axios from "lib/axios";

interface Props {
  value: string;
  onChange: (value: string) => void;
}
type ResponseOpponents = {
  users: string[];
};

const GetOpponents: FC<Props> = ({ value, onChange }) => {
  const [opponents, setOpponents] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("gamerToken");
    axios
      .get<ResponseOpponents>("user/opponents", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { users } = response.data;
        setOpponents(users);
        if (users.length) {
          onChange(users[0]);
        }
      });
  }, []);
  const handleChange = (e: FormEvent<HTMLSelectElement>) =>
    onChange(e.currentTarget.value);
  return (
    <Form.Group controlId="opponent">
      <Form.Label>Выберете оппонента</Form.Label>
      <Form.Select value={value} onChange={handleChange}>
        {opponents.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default GetOpponents;
