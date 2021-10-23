import { useState } from "react";
import type { FC } from "react";
import type { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";

import { useGuardOnToken } from "lib/hook";
import axios from "lib/axios";
import { getAxiosErrorMessage } from "lib/axios";
import NewGameForm from "./NewGameForm";

const NewGame: FC = () => {
  useGuardOnToken();
  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (selectedOpponent: string) => {
    const token = localStorage.getItem("gamerToken");
    setBusy(true);
    try {
      const response = (await axios({
        method: "POST",
        url: "/game",
        headers: { Authorization: `Bearer ${token}` },
        data: {
          game: { opponent: "" },
        },
      })) as AxiosResponse<{ game: { id: string } }>;
      const { id } = response.data.game;
      history.push(`/game-info/${id}`);
    } catch (error) {
      setBusy(false);
      setErrorMessage(getAxiosErrorMessage(error));
    }
  };
  return <NewGameForm onSubmit={onSubmit} error={errorMessage} busy={busy} />;
};

export default NewGame;
