import type { FC } from "react";
import { useParams } from "react-router-dom";

import { Game, GameContext } from "stores/game";
import { useAuthenticatedSocket } from "lib/useSocket";

import GameMainContainer from "components/Game/GameMainContainer";
import GameResult from "components/GameResult";

const GameComponent: FC = () => {
  const { id: gameId } = useParams<{ id: string }>();
  const { connected } = useAuthenticatedSocket();

  if (!connected) return <div>Not connected to socket</div>;

  const gameStore = new Game(gameId);
  return (
    <GameContext.Provider value={gameStore}>
      <GameMainContainer />
      <GameResult />
    </GameContext.Provider>
  );
};

export default GameComponent;
