import type { FC } from "react";

import OpponentName from "./OpponentName";
import OpponentCards from "./OpponentCards";

const Opponent: FC = () => (
  <div>
    <OpponentName />
    <OpponentCards />
  </div>
);

export default Opponent;
