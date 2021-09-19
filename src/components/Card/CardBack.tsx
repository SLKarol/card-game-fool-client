import { FC } from "react";

import clsx from "clsx";

interface Props {
  className?: string;
}

const Back: FC<Props> = ({ className }) => (
  <div className={clsx("gameCard", "gameCard__back", className)} />
);

export default Back;
