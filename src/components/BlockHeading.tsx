import type { FC } from "react";

interface Props {
  textClassName?: string;
}

const BlockHeading: FC<Props> = ({ children, textClassName = "text-info" }) => (
  <div className="block-heading">
    <h2 className={textClassName}>{children}</h2>
  </div>
);

export default BlockHeading;
