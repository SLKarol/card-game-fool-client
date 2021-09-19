import { FC } from "react";
import { observer } from "mobx-react";

import { useGameStore } from "stores/game";
import CardsInHands from "../Common/CardsInHands";

import ButtonPlayerCard from "./ButtonPlayerCard";

const PlayerCards: FC = () => {
  const {
    game: { userCards },
  } = useGameStore();

  return (
    <CardsInHands>
      {userCards.map((c) => (
        <ButtonPlayerCard key={c.idCard} id={c.idCard} />
      ))}
    </CardsInHands>
  );
};

export default observer(PlayerCards);
