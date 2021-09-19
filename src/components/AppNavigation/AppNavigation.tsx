import type { FC } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

import NavItem from "./NavItem";

interface Props {}

const navItems = [
  {
    exact: true,
    to: "/",
    caption: "Home",
  },
  {
    to: "/start",
    caption: "Новая игра",
  },
  {
    to: "/open",
    caption: "Продолжить",
  },
  {
    to: "/reports",
    caption: "Статистика",
  },
  {
    to: "/about",
    caption: "О Программе",
  },
  {
    to: "/login",
    caption: "Login",
  },
];

const AppNavigation: FC = (props: Props) => (
  <Navbar bg="white" expand="lg" fixed="top" className="clean-navbar">
    <Container>
      <Navbar.Brand as={Link} to="/" className="logo">
        Подкидной дурак
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="ms-auto">
          {navItems.map((n) => (
            <NavItem key={n.to} exact={n.exact} to={n.to}>
              {n.caption}
            </NavItem>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default AppNavigation;
