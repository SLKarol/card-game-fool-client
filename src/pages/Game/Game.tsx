import type { FC } from "react";
import { useParams } from "react-router-dom";

import { Game, GameContext } from "stores/game";
import GameMainContainer from "components/Game/GameMainContainer";

const GameComponent: FC = () => {
  const { id: gameId } = useParams<{ id: string }>();
  const gameStore = new Game(gameId);
  return (
    <GameContext.Provider value={{ game: gameStore }}>
      <GameMainContainer />
    </GameContext.Provider>
  );
};

export default GameComponent;
