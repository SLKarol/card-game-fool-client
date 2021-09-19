import { FC } from "react";
import CardFront from "components/Card/CardFront";

import styles from "./index.module.css";

const TableContainer: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.gameCards}>
        <CardFront id={1} className="gameCard__table" />
        <CardFront
          id={11}
          className="gameCard__table gameCard__table--defence"
        />
      </div>
      <div className={styles.gameCards}>
        <CardFront id={2} className="gameCard__table" />
        <CardFront
          id={31}
          className="gameCard__table gameCard__table--defence"
        />
      </div>
      <div className={styles.gameCards}>
        <CardFront id={22} className="gameCard__table" />
        <CardFront
          id={17}
          className="gameCard__table gameCard__table--defence"
        />
      </div>
      <div className={styles.gameCards}>
        <CardFront id={17} className="gameCard__table" />
        <CardFront
          id={22}
          className="gameCard__table gameCard__table--defence"
        />
      </div>
      <div className={styles.gameCards}>
        <CardFront id={1} className="gameCard__table" />
        <CardFront
          id={11}
          className="gameCard__table gameCard__table--defence"
        />
      </div>
      <div className={styles.gameCards}>
        <CardFront id={2} className="gameCard__table" />
        <CardFront
          id={31}
          className="gameCard__table gameCard__table--defence"
        />
      </div>
      <div className={styles.gameCards}>
        <CardFront id={22} className="gameCard__table" />
        <CardFront
          id={17}
          className="gameCard__table gameCard__table--defence"
        />
      </div>
      <div className={styles.gameCards}>
        <CardFront id={17} className="gameCard__table" />
        <CardFront
          id={22}
          className="gameCard__table gameCard__table--defence"
        />
      </div>
      <div className={styles.gameCards}>
        <CardFront id={1} className="gameCard__table" />
        <CardFront
          id={11}
          className="gameCard__table gameCard__table--defence"
        />
      </div>
      <div className={styles.gameCards}>
        <CardFront id={2} className="gameCard__table" />
        <CardFront
          id={31}
          className="gameCard__table gameCard__table--defence"
        />
      </div>
      <div className={styles.gameCards}>
        <CardFront id={22} className="gameCard__table" />
        <CardFront
          id={17}
          className="gameCard__table gameCard__table--defence"
        />
      </div>
      <div className={styles.gameCards}>
        <CardFront id={17} className="gameCard__table" />
        <CardFront
          id={22}
          className="gameCard__table gameCard__table--defence"
        />
      </div>
      <div className={styles.gameCards}>
        <CardFront id={17} className="gameCard__table" />
        <CardFront
          id={22}
          className="gameCard__table gameCard__table--defence"
        />
      </div>
      <div className={styles.gameCards}>
        <CardFront id={17} className="gameCard__table" />
        <CardFront
          id={22}
          className="gameCard__table gameCard__table--defence"
        />
      </div>
    </div>
  );
};

export default TableContainer;
