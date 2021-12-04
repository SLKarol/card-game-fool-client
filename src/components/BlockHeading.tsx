import type { FC } from "react";

interface Props {
  textClassName?: string;
  description?: string;
}

const BlockHeading: FC<Props> = ({
  children,
  textClassName = "text-info",
  description,
}) => (
  <div className="block-heading">
    <h2 className={textClassName}>{children}</h2>
    {description && <p>{description}</p>}
  </div>
);

export default BlockHeading;
