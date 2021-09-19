import type { FC } from "react";
import clsx from "clsx";

interface Props {
  className?: string;
  label: string;
}

const ItemDescription: FC<Props> = ({ className, label, children }) => {
  return (
    <h4>
      <span className={clsx("feature", className)}>{label}</span>
      {children}
    </h4>
  );
};

export default ItemDescription;
