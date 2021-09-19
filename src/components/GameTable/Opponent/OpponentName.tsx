import { FC } from "react";
import { observer } from "mobx-react";

import { useGameStore } from "stores/game";
import PlayerName from "../Common/PlayerName";

const OpponentName: FC = () => {
  const {
    game: {
      opponent: { name },
    },
  } = useGameStore();
  return <PlayerName name={name} opponent />;
};

export default observer(OpponentName);
