import type { FC } from "react";
import clsx from "clsx";

interface Props {
  id: number;
  className?: string;
}

const CardFront: FC<Props> = ({ id, className }) => (
  <div className={clsx("gameCard", `gameCard__${id}`, className)}></div>
);
export default CardFront;
