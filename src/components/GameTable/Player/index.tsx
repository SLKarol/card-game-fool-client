import type { FC } from "react";

import ButtonPlayer from "./ButtonPlayer";
import PlayerCards from "./PlayerCards";
import PlayerName from "./PlayerName";

const Player: FC = () => (
  <div>
    <PlayerName />
    <ButtonPlayer />
    <PlayerCards />
  </div>
);

export default Player;
