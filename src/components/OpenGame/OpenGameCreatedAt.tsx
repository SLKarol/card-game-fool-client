import type { FC } from "react";

import { formatFromISO } from "lib/dateTime";

interface Props {
  value: string;
}

const OpenGameCreatedAt: FC<Props> = ({ value }) => (
  <small>{formatFromISO(value)}</small>
);

export default OpenGameCreatedAt;
