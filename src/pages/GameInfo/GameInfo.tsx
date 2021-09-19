import { PureComponent } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";
import clsx from "clsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import type { ErrorStore } from "stores/error";

import axios from "lib/axios";
import { RootStoreContext } from "stores/root";
import BlockHeading from "components/BlockHeading";
import PricingItemHeader from "components/PricingItem/Header";
import ItemDescription from "components/PricingItem/ItemDescription";

import styles from "./styles.module.css";
import { formatFromISO } from "lib/dateTime";

interface StateGameInfo {
  id: string;
  createdAt: string;
  available: boolean;
}
interface State {
  redirect: boolean;
  game: StateGameInfo;
}

interface PathParamsType {
  id: string;
}

const GameInfoObserver = observer(
  class GameInfo extends PureComponent<
    RouteComponentProps<PathParamsType>,
    State
  > {
    state = {
      redirect: false,
      game: { id: "", createdAt: "", available: true },
    };
    static contextType = RootStoreContext;

    componentDidMount() {
      const { id } = this.props.match.params;
      if (!id) {
        this.setState({ redirect: true });
      }
      const token = localStorage.getItem("gamerToken");
      axios
        .get<{ game: StateGameInfo }>(`game/info?id=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(
          (response) => {
            const { game } = response.data;
            this.setState({ game });
          },
          (error) => {
            const { setAxiosError } = this.context.rootStore
              .errorStore as ErrorStore;
            setAxiosError(error);
            this.setState({ redirect: true });
          }
        );
    }

    render() {
      const {
        redirect,
        game: { createdAt, id, available },
      } = this.state;
      if (redirect) {
        return <Redirect to="/error" />;
      }
      const created = createdAt && formatFromISO(createdAt);
      return (
        <section className={clsx("clean-block", styles.container)}>
          <Container>
            <BlockHeading>Выбранная игра</BlockHeading>
            <Row className="justify-content-center">
              <Col md={5} lg={4}>
                <div className="clean-pricing-item">
                  <PricingItemHeader>
                    {available ? "Продолжить" : "Игра окончена"}
                  </PricingItemHeader>
                  <p>
                    Здесь Вы можете продолжить матч или скопировать ссылку на
                    игру.
                  </p>
                  <div className="features">
                    <ItemDescription
                      className={styles.marginRight}
                      label="Создана:"
                    >
                      <span>{created}</span>
                    </ItemDescription>
                    {available && (
                      <ItemDescription
                        className={styles.marginRight}
                        label="Ссылка:"
                      >
                        <Link to={`/game/${id}`}>Играть</Link>
                      </ItemDescription>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      );
    }
  }
);
export default withRouter(GameInfoObserver);
