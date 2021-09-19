import type { FC } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FooterItems from "./FooterItems";

const footerBlocks = [
  {
    caption: "Начало",
    items: [
      {
        link: "/",
        caption: "Домашняя страница",
      },
      {
        link: "/register",
        caption: "Регистрация",
      },
      {
        link: "/about",
        caption: "О программе",
      },
    ],
  },
  {
    caption: "Игра",
    items: [
      {
        link: "/start",
        caption: "Начать игру",
      },
      {
        link: "/open",
        caption: "Присоедениться",
      },
      {
        link: "/reports",
        caption: "Статистика",
      },
    ],
  },
];

const AppFooter: FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="page-footer dark">
      <Container>
        <Row>
          {footerBlocks.map((f) => (
            <Col sm={3} key={f.caption}>
              <h5>{f.caption}</h5>
              <FooterItems items={f.items} />
            </Col>
          ))}
        </Row>
      </Container>
      <div className="footer-copyright">
        <p>&copy; {year} Кароль С. Л.</p>
      </div>
    </footer>
  );
};

export default AppFooter;
