import type { FC } from "react";

import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

interface Props {
  exact?: boolean;
  to: string;
}

/**
 * Элемент навигации
 */
const NavItem: FC<Props> = ({ to, children, exact = false }) => (
  <Nav.Item>
    <Nav.Link as={NavLink} to={to} exact={exact}>
      {children}
    </Nav.Link>
  </Nav.Item>
);

export default NavItem;
