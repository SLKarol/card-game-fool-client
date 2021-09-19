import type { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  items: {
    link: string;
    caption: string;
  }[];
}

const FooterItems: FC<Props> = ({ items }) => (
  <ul>
    {items.map((i) => (
      <li key={i.link}>
        <Link to={i.link}>{i.caption}</Link>
      </li>
    ))}
  </ul>
);

export default FooterItems;
