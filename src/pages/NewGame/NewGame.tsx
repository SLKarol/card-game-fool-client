import type { FC } from "react";

import { useGuardOnToken } from "lib/hook";
import NewGameForm from "./NewGameForm";

const NewGame: FC = () => {
  useGuardOnToken();

  const onSubmit = (selectedOpponent: string) => {
    console.log("selectedOpponent :>> ", selectedOpponent);
  };
  return <NewGameForm onSubmit={onSubmit} />;
};

export default NewGame;
