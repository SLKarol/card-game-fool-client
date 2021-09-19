import type { FC } from "react";
import { observer } from "mobx-react";
import Badge from "react-bootstrap/Badge";

import { useGameStore } from "stores/game";

import { ReactComponent as Suit1 } from "img/suit1.svg";
import { ReactComponent as Suit2 } from "img/suit2.svg";
import { ReactComponent as Suit3 } from "img/suit3.svg";
import { ReactComponent as Suit4 } from "img/suit4.svg";

const TrumpSuit: FC = () => {
  const {
    game: {
      trumpCard: { idSuit },
    },
  } = useGameStore();
  return (
    <div className="text-center">
      <Badge bg={idSuit < 3 ? "dark" : "danger"} title="Козырная масть">
        {idSuit === 1 && <Suit1 />}
        {idSuit === 2 && <Suit2 />}
        {idSuit === 3 && <Suit3 />}
        {idSuit === 4 && <Suit4 />}
      </Badge>
    </div>
  );
};

export default observer(TrumpSuit);
