import { FC } from "react";
import { observer } from "mobx-react";

import { useGameStore } from "stores/game";
import CardsInHands from "../Common/CardsInHands";

import ButtonPlayerCard from "./ButtonPlayerCard";

const PlayerCards: FC = () => {
  const {
    game: {
      userCards: { idsCards },
    },
  } = useGameStore();

  return (
    <CardsInHands>
      {idsCards.map((i) => (
        <ButtonPlayerCard key={i} id={i} />
      ))}
    </CardsInHands>
  );
};

export default observer(PlayerCards);
