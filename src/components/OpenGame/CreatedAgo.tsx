import { FC } from "react";
import { formatDistance, parseJSON } from "date-fns";
import { ru } from "date-fns/locale";

interface Props {
  value: string;
  now: Date;
}

const CreatedAgo: FC<Props> = ({ value, now }) => {
  const text = formatDistance(parseJSON(value), now, {
    locale: ru,
    addSuffix: true,
  });
  return <span>{text}</span>;
};

export default CreatedAgo;
