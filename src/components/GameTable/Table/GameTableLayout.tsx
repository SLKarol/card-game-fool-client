import { FC } from "react";
import { observer } from "mobx-react";

import { useGameStore } from "stores/game";

import CardsInTable from "./CardsInTable";

const GameTableLayout: FC = () => {
  const {
    game: {
      gameTable: { arrayCards },
    },
  } = useGameStore();

  return (
    <>
      {arrayCards.map((c) => (
        <CardsInTable
          key={`${c.attack}/${c.defence}`}
          attack={c.attack}
          defence={c.defence}
        />
      ))}
    </>
  );
};

export default observer(GameTableLayout);
